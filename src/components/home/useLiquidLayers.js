import { useMemo } from "react";

const GEOMETRIA_MARGARITA = {
	// Dónde cambia de forma la copa (del 0 al 1)
	puntoTransicionAltura: 0.4, // El bulbo inferior es el 40% de la altura total

	// Qué parte del volumen total cabe en el bulbo inferior (del 0 al 1)
	proporcionVolumenBase: 0.3, // El 30% de los ml totales llenan la base
};

function calcularAlturaMargarita(volumenAcumuladoProporcion) {
	const { puntoTransicionAltura, proporcionVolumenBase } = GEOMETRIA_MARGARITA;

	// ZONA 1: El volumen acumulado está dentro del bulbo base
	if (volumenAcumuladoProporcion <= proporcionVolumenBase) {
		// Usamos lógica cónica (raíz cúbica) escalada a la zona base
		const proporcionDentroDeBase =
			volumenAcumuladoProporcion / proporcionVolumenBase;
		return Math.pow(proporcionDentroDeBase, 1 / 3) * puntoTransicionAltura;
	}

	// ZONA 2: El volumen acumulado supera la base e invade el plato superior
	else {
		// Calculamos cuánto volumen "extra" hay en la zona superior
		const volumenSuperiorProporcion = 1 - proporcionVolumenBase;
		const volumenExtraEnSuperior =
			volumenAcumuladoProporcion - proporcionVolumenBase;

		// Usamos lógica lineal (cilíndrica) escalada a la zona superior
		const proporcionDentroDeSuperior =
			volumenExtraEnSuperior / volumenSuperiorProporcion;
		const alturaRestante = 1 - puntoTransicionAltura;

		return puntoTransicionAltura + proporcionDentroDeSuperior * alturaRestante;
	}
}

// Capas con una curva de vaciado no lineal (martini, margarita): se calcula
// desde el fondo del vaso hacia arriba y al final se revierte para pintar
// en el orden original de ingredients.
function calcularCapasPorCurva(ingredients, alturaPorProporcion) {
	const totalQuantity = ingredients.reduce((acc, ing) => acc + ing.quantity, 0);
	const reversedIngredients = [...ingredients].reverse();

	let cumulativeVolume = 0;
	let previousHeightPos = 0;

	const calculatedLayers = reversedIngredients.map((ingredient) => {
		cumulativeVolume += ingredient.quantity;
		const currentHeightPos = alturaPorProporcion(cumulativeVolume / totalQuantity);
		const visualHeight = (currentHeightPos - previousHeightPos) * 100;
		previousHeightPos = currentHeightPos;
		return { ...ingredient, visualHeight };
	});

	return calculatedLayers.reverse();
}

// Capas con proporción lineal simple: el resto de los vasos (rocks, collins,
// old fashioned, etc.), donde el grosor visual es directamente proporcional
// a la cantidad del ingrediente.
function calcularCapasLineales(ingredients) {
	const totalQuantity = ingredients.reduce((acc, ing) => acc + ing.quantity, 0);
	return ingredients.map((ingredient) => ({
		...ingredient,
		visualHeight: (ingredient.quantity / totalQuantity) * 100,
	}));
}

// Convierte los ingredientes de un trago en capas listas para pintar en el
// viewer, calculando qué porcentaje de altura le corresponde a cada una
// según la forma del vaso (martini y margarita usan curvas de vaciado
// propias; el resto usa una proporción lineal simple). Memoizado por drink
// para no repetir el cálculo en cada render (el catálogo puede llegar a
// miles de tragos, y muchos re-renders del listado no cambian el drink).
export function useLiquidLayers(drink) {
	return useMemo(() => {
		switch (drink.glass.name) {
			case "martini":
				return calcularCapasPorCurva(drink.ingredients, (proporcion) =>
					Math.pow(proporcion, 1 / 3),
				);
			case "margarita":
				return calcularCapasPorCurva(drink.ingredients, calcularAlturaMargarita);
			default:
				return calcularCapasLineales(drink.ingredients);
		}
	}, [drink]);
}

export default useLiquidLayers;
