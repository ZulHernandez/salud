import { useMemo } from "react";

// Convierte los grupos por letra (infoFinal) en un arreglo plano de "filas"
// listo para virtualizar. La forma de cada fila depende de la vista:
// - lista: una fila de encabezado por letra + una fila por trago.
// - tarjetas: una fila por letra completa. El carrusel horizontal de esa
//   letra se sigue renderizando entero adentro (sin virtualizar ese eje):
//   ninguna letra sola llega a tener cientos de tragos aunque el catálogo
//   crezca a miles, así que no vale la pena la complejidad de virtualizar
//   también horizontalmente.
// - cuadrícula: no hay letras, se agrupan "columns" tragos por fila.
export function useCatalogRows(infoFinal, view, columns) {
	return useMemo(() => {
		if (view === "cuadricula") {
			const flat = infoFinal.flatMap((g) => g.drinks);
			const rows = [];
			for (let i = 0; i < flat.length; i += columns) {
				rows.push({ type: "grid-row", drinks: flat.slice(i, i + columns) });
			}
			return { rows, letterRowIndex: new Map() };
		}

		if (view === "tarjetas") {
			const rows = infoFinal.map((group) => ({
				type: "letter-section",
				letter: group.letter,
				drinks: group.drinks,
			}));
			const letterRowIndex = new Map(
				rows.map((row, index) => [row.letter, index]),
			);
			return { rows, letterRowIndex };
		}

		// lista
		const rows = [];
		const letterRowIndex = new Map();
		infoFinal.forEach((group) => {
			letterRowIndex.set(group.letter, rows.length);
			rows.push({
				type: "header",
				letter: group.letter,
				count: group.drinks.length,
			});
			group.drinks.forEach((drink) => {
				rows.push({ type: "drink", drink });
			});
		});
		return { rows, letterRowIndex };
	}, [infoFinal, view, columns]);
}

export default useCatalogRows;
