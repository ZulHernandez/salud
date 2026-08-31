import { describe, expect, it } from "vitest";
import { validarRecetas } from "./validar-recetas.mjs";

const glassware = { rocks: {}, coupe: {} };

function recetaValida(overrides = {}) {
	return {
		glass: "rocks",
		ingredients: [{ alcohol: "gin", quantity: 30 }],
		ganish: ["ice_cube"],
		unity: "ml",
		infoAli: { calories: 120, alcVol: 20 },
		mix_color: "#AABBCC",
		...overrides,
	};
}

describe("validarRecetas", () => {
	it("no lanza con un catálogo válido", () => {
		expect(() =>
			validarRecetas({ negroni: recetaValida() }, { glassware }),
		).not.toThrow();
	});

	it("acepta infoAli null o con campos ausentes", () => {
		expect(() =>
			validarRecetas(
				{
					a: recetaValida({ infoAli: null }),
					b: recetaValida({ infoAli: { calories: null, alcVol: 12 } }),
				},
				{ glassware },
			),
		).not.toThrow();
	});

	it("rechaza un vaso que no existe en glassware.js", () => {
		expect(() =>
			validarRecetas(
				{ negroni: recetaValida({ glass: "vaso-inventado" }) },
				{ glassware },
			),
		).toThrow(/glass/);
	});

	it("rechaza ingredients vacío", () => {
		expect(() =>
			validarRecetas({ negroni: recetaValida({ ingredients: [] }) }, { glassware }),
		).toThrow(/ingredients/);
	});

	it("rechaza quantity no numérica o no positiva", () => {
		expect(() =>
			validarRecetas(
				{ negroni: recetaValida({ ingredients: [{ alcohol: "gin", quantity: 0 }] }) },
				{ glassware },
			),
		).toThrow(/quantity/);
	});

	it("rechaza infoAli con tipos incorrectos", () => {
		expect(() =>
			validarRecetas(
				{ negroni: recetaValida({ infoAli: { calories: "120", alcVol: 20 } }) },
				{ glassware },
			),
		).toThrow(/infoAli\.calories/);
	});

	it("rechaza mix_color que no es un hex válido", () => {
		expect(() =>
			validarRecetas({ negroni: recetaValida({ mix_color: "naranja" }) }, { glassware }),
		).toThrow(/mix_color/);
	});

	it("junta todos los errores en un solo throw", () => {
		expect(() =>
			validarRecetas(
				{ negroni: recetaValida({ ganish: "no-es-arreglo", unity: "" }) },
				{ glassware },
			),
		).toThrow(/2 error/);
	});
});
