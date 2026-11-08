import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useView } from "./ViewContext";
import { useUI } from "./UIContext";
import { useGlassFilter } from "./GlassFilterContext";
import { useFilteredDrinks } from "../../hooks/useFilteredDrinks";
import { useCatalogRows } from "../../hooks/useCatalogRows";
import { CatalogContext } from "./CatalogContext";

// Alto estimado de cada tipo de fila, por vista. Son solo un punto de
// partida: el virtualizador remide el alto real de cada fila después de
// pintarla (measureElement) y corrige la posición, así que no hace falta
// que sean exactos, solo razonables para que el scrollbar no salte mucho
// mientras se van midiendo.
// Ojo con "drink": el html raíz usa font-size: 10px (ver index.scss), y el
// alto real de una .list (viewer + nombre + ingredientes + info nutricional)
// ronda los 260px, no 140. Un estimado muy alejado del alto real es lo que
// hacía sentir "atorones" al hacer scroll rápido en la vista de lista: con
// overscan hay muchas filas nunca medidas entrando de golpe, y si el estimado
// está muy mal el virtualizador tiene que corregir la posición de todo lo
// que viene después con un salto grande apenas se mide cada una.
const ALTURA_ESTIMADA = {
	header: 60,
	drink: 260,
	"letter-section": 520,
	"grid-row": 340,
};

function estimarAlto(row) {
	return ALTURA_ESTIMADA[row.type] ?? 140;
}

export const CatalogProvider = ({ children }) => {
	const { view } = useView();
	const { viewport } = useUI();
	const { allFilters } = useGlassFilter();

	const infoFinal = useFilteredDrinks();

	// Columnas fijas por breakpoint para poder virtualizar la cuadrícula por
	// filas (con columnas fluidas no hay forma de saber cuántos ítems caben
	// en una fila sin medir el DOM).
	const columns = viewport.isDesktop ? 5 : viewport.isTablet ? 3 : 2;

	const { rows, letterRowIndex } = useCatalogRows(infoFinal, view, columns);

	const listRef = useRef(null);
	const [scrollMargin, setScrollMargin] = useState(0);

	// La distancia entre el top de la página y donde arranca el listado
	// cambia (el padding-top de .main depende de si hay chips de filtro
	// activos y de si es mobile), así que se remide cada vez que eso puede
	// haber cambiado, y también en cada resize por si el layout responsivo
	// mueve las cosas.
	useLayoutEffect(() => {
		const medir = () => {
			if (!listRef.current) return;
			const top = listRef.current.getBoundingClientRect().top + window.scrollY;
			setScrollMargin(top);
		};
		medir();
		window.addEventListener("resize", medir);
		return () => window.removeEventListener("resize", medir);
	}, [allFilters.length, view]);

	const virtualizer = useWindowVirtualizer({
		count: rows.length,
		estimateSize: (index) => estimarAlto(rows[index]),
		overscan: 6,
		scrollMargin,
	});

	const letters = useMemo(() => infoFinal.map((g) => g.letter), [infoFinal]);

	// Índice de fila al que RoHome debe moverle el foco de teclado en cuanto
	// termine de montarse (scrollToIndex solo mueve el scroll; sin esto, a
	// alguien navegando con teclado o lector de pantalla no le queda claro
	// que "llegó" a la letra). RoHome lo consume y lo limpia una vez que
	// logra enfocar esa fila.
	const [pendingFocusIndex, setPendingFocusIndex] = useState(null);
	const clearPendingFocus = useCallback(() => setPendingFocusIndex(null), []);

	const scrollToLetter = useCallback(
		(letter) => {
			const index = letterRowIndex.get(letter);
			if (index === undefined) return;
			virtualizer.scrollToIndex(index, { align: "start" });
			setPendingFocusIndex(index);
		},
		[letterRowIndex, virtualizer],
	);

	const value = useMemo(
		() => ({
			infoFinal,
			rows,
			virtualizer,
			listRef,
			letters,
			scrollToLetter,
			pendingFocusIndex,
			clearPendingFocus,
		}),
		[
			infoFinal,
			rows,
			virtualizer,
			letters,
			scrollToLetter,
			pendingFocusIndex,
			clearPendingFocus,
		],
	);

	return (
		<CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
	);
};

export default CatalogProvider;
