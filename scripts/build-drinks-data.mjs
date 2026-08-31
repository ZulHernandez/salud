import { register } from "node:module";
import { pathToFileURL } from "node:url";
import fs from "node:fs";
import path from "node:path";

// Compila src/utils/drinks.js (donde sigues escribiendo las recetas, con
// referencias directas a glassware/licours para que sea cómodo de mantener)
// a un JSON "liviano" que solo trae claves de texto, sin nada de los objetos
// de glassware/licours (esos se quedan en el bundle de la app: son un set
// fijo que no crece con el catálogo). Este JSON es lo que se sube al repo
// de datos y se sirve por CDN, en vez de venir empaquetado en el JS de la
// app.
//
// Node no entiende imports de .svg/.png (eso lo resuelve Vite en la app),
// así que usamos un loader auxiliar que los reemplaza por texto plano solo
// para poder cargar estos módulos aquí.
register("./asset-stub-loader.mjs", pathToFileURL(`${import.meta.dirname}/`));

const { default: drinks } = await import("../src/utils/drinks.js");
const { default: glassware } = await import("../src/utils/glassware.js");
const { default: licours } = await import("../src/utils/licours.js");

// Reverso: objeto de licours -> su clave de texto.
const claveDeLicour = new Map();
for (const [clave, valor] of Object.entries(licours)) {
	claveDeLicour.set(valor, clave);
}

// Reverso: objeto de guarnición -> su clave de texto (única incluso entre
// vasos distintos, porque cada vaso trae su propia posición para cada
// guarnición, así que nunca comparten la misma instancia).
const claveDeGanish = new Map();
for (const vaso of Object.values(glassware)) {
	for (const [clave, valor] of Object.entries(vaso.ganish || {})) {
		claveDeGanish.set(valor, clave);
	}
}

const recetas = {};
for (const [claveTrago, trago] of Object.entries(drinks)) {
	recetas[claveTrago] = {
		glass: trago.glass.name,
		ingredients: trago.ingredients.map((ingrediente) => {
			const claveAlcohol = claveDeLicour.get(ingrediente.alcohol);
			if (!claveAlcohol) {
				throw new Error(
					`No encontré la clave de licours para un ingrediente de "${claveTrago}"`,
				);
			}
			const salida = { alcohol: claveAlcohol, quantity: ingrediente.quantity };
			if (ingrediente.chill) salida.chill = true;
			return salida;
		}),
		ganish: trago.ganish.map((guarnicion) => {
			const claveGanish = claveDeGanish.get(guarnicion);
			if (!claveGanish) {
				throw new Error(`No encontré la clave de ganish para "${claveTrago}"`);
			}
			return claveGanish;
		}),
		unity: trago.unity,
		infoAli: trago.infoAli,
		mix_color: trago.mix_color,
	};
}

validarRecetas(recetas, { glassware });

const destino = path.resolve(process.cwd(), "public/data/drinks.json");
fs.mkdirSync(path.dirname(destino), { recursive: true });
fs.writeFileSync(destino, JSON.stringify(recetas, null, "\t"));

console.log(
	`Listo: ${Object.keys(recetas).length} cocteles exportados a public/data/drinks.json`,
);

// Chequeo de forma sobre el JSON ya compilado: es lo que se sube tal cual a
// salud-data y se sirve por CDN, así que un error aquí antes de mandarlo es
// mucho más barato que uno en producción con el catálogo a medio cargar.
function validarRecetas(recetas, { glassware }) {
	const errores = [];
	const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

	for (const [claveTrago, trago] of Object.entries(recetas)) {
		const prefijo = `"${claveTrago}"`;

		if (!glassware[trago.glass]) {
			errores.push(`${prefijo}: glass "${trago.glass}" no existe en glassware.js`);
		}
		if (!Array.isArray(trago.ingredients) || trago.ingredients.length === 0) {
			errores.push(`${prefijo}: ingredients debe ser un arreglo no vacío`);
		} else {
			trago.ingredients.forEach((ingrediente, i) => {
				if (typeof ingrediente.alcohol !== "string" || !ingrediente.alcohol) {
					errores.push(`${prefijo}: ingredients[${i}].alcohol inválido`);
				}
				if (typeof ingrediente.quantity !== "number" || ingrediente.quantity <= 0) {
					errores.push(`${prefijo}: ingredients[${i}].quantity inválido`);
				}
			});
		}
		if (!Array.isArray(trago.ganish)) {
			errores.push(`${prefijo}: ganish debe ser un arreglo`);
		}
		if (typeof trago.unity !== "string" || !trago.unity) {
			errores.push(`${prefijo}: unity inválido`);
		}
		// infoAli (y sus campos) es opcional a propósito: CoCard/CoList lo
		// renderizan condicionalmente cuando falta info nutricional de un
		// trago. Solo se valida que, si están presentes, sean números.
		if (trago.infoAli != null) {
			const { calories, alcVol } = trago.infoAli;
			if (calories != null && typeof calories !== "number") {
				errores.push(`${prefijo}: infoAli.calories debe ser número (o null/ausente)`);
			}
			if (alcVol != null && typeof alcVol !== "number") {
				errores.push(`${prefijo}: infoAli.alcVol debe ser número (o null/ausente)`);
			}
		}
		if (typeof trago.mix_color !== "string" || !HEX_COLOR.test(trago.mix_color)) {
			errores.push(`${prefijo}: mix_color debe ser un hex de 6 dígitos (ej. "#AABBCC")`);
		}
	}

	if (errores.length > 0) {
		throw new Error(
			`drinks.json inválido, ${errores.length} error(es):\n- ${errores.join("\n- ")}`,
		);
	}
}
