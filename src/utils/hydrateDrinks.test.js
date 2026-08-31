import { describe, expect, it } from "vitest";
import { hydrateDrinks } from "./hydrateDrinks";

const glassware = {
	rocks: { ganish: { ice: "🧊", lime: "🍋" } },
};

const licours = {
	gin: { name: "gin", color: "#ffffff" },
	vermouth: { name: "vermouth", color: "#aa0000" },
};

describe("hydrateDrinks", () => {
	it("reconstruye glass, ingredients y ganish a partir de sus claves", () => {
		const recetas = {
			negroni: {
				glass: "rocks",
				ingredients: [
					{ alcohol: "gin", quantity: 30 },
					{ alcohol: "vermouth", quantity: 30, chill: true },
				],
				ganish: ["ice", "lime"],
				unity: "ml",
				infoAli: { calories: 180, alcVol: 21 },
				mix_color: "#D55633",
			},
		};

		const hidratado = hydrateDrinks(recetas, { glassware, licours });

		expect(hidratado.negroni.name).toBe("negroni");
		expect(hidratado.negroni.glass.glass).toBe(glassware.rocks);
		expect(hidratado.negroni.ingredients).toEqual([
			{ alcohol: licours.gin, quantity: 30 },
			{ alcohol: licours.vermouth, quantity: 30, chill: true },
		]);
		expect(hidratado.negroni.ganish).toEqual(["🧊", "🍋"]);
		expect(hidratado.negroni.unity).toBe("ml");
		expect(hidratado.negroni.infoAli).toEqual({ calories: 180, alcVol: 21 });
		expect(hidratado.negroni.mix_color).toBe("#D55633");
	});

	it("no agrega chill cuando el ingrediente original no lo trae", () => {
		const recetas = {
			trago: {
				glass: "rocks",
				ingredients: [{ alcohol: "gin", quantity: 10 }],
				ganish: [],
				unity: "ml",
				infoAli: null,
				mix_color: "#000000",
			},
		};

		const { ingredients } = hydrateDrinks(recetas, { glassware, licours }).trago;
		expect(ingredients[0]).not.toHaveProperty("chill");
	});
});
