// Chequeo de forma sobre el JSON ya compilado (ver build-drinks-data.mjs):
// es lo que se sube tal cual a salud-data y se sirve por CDN, así que un
// error aquí antes de mandarlo es mucho más barato que uno en producción
// con el catálogo a medio cargar. Separado de build-drinks-data.mjs para
// poder testearlo sin pasar por el loader de assets.
export function validarRecetas(recetas, { glassware }) {
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

export default validarRecetas;
