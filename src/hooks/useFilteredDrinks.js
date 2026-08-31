import { use, useMemo } from "react";
import { useLanguage } from "../components/context/LanguageContext";
import { useGlassFilter } from "../components/context/GlassFilterContext";
import { getCatalogoPromise } from "../utils/drinksSource";

// Filtra, ordena (según el idioma activo) y agrupa por inicial el catálogo
// completo de tragos. Es la base compartida para la lista, el índice
// alfabético y la virtualización: antes este cálculo estaba duplicado en
// RoHome y en CoIndex, ahora se calcula una sola vez.
//
// El catálogo ya no viene de un import estático: `use()` suspende el
// render hasta que el fetch de drinksSource resuelve (ver CatalogProvider,
// que ahora vive dentro de un <Suspense>), y de ahí en adelante queda en
// memoria para el resto de la sesión.
export function useFilteredDrinks() {
	const { t, language } = useLanguage();
	const { allFilters, searchQuery } = useGlassFilter();
	const drinks = use(getCatalogoPromise());

	return useMemo(() => {
		const collator = new Intl.Collator(language, {
			numeric: true,
			sensitivity: "base",
		});

		// Filtramos primero
		const filtered = Object.entries(drinks).filter(([key, drink]) => {
			const translatedName = t(key).toLowerCase();
			const searchLower = searchQuery.toLowerCase();

			// Filtro de chips (buscamos en la data cruda del trago)
			const searchableContent = JSON.stringify(drink).toLowerCase();
			const matchesChips = allFilters.every((f) =>
				searchableContent.includes(f.text.toLowerCase()),
			);

			return matchesChips && translatedName.includes(searchLower);
		});

		// Ordenamos por la traducción
		const sorted = filtered.sort((a, b) => {
			return collator.compare(t(a[0]), t(b[0]));
		});

		// Agrupamos en un Array
		return sorted.reduce((acc, [key, data]) => {
			const translatedName = t(key);
			const firstLetter = translatedName.charAt(0).toUpperCase();

			let group = acc.find((g) => g.letter === firstLetter);
			if (!group) {
				group = { letter: firstLetter, drinks: [] };
				acc.push(group);
			}
			group.drinks.push({ key, ...data });
			return acc;
		}, []);

		// IMPORTANTE: language debe estar en las deps para que se dispare el re-render
	}, [drinks, language, searchQuery, allFilters, t]);
}

export default useFilteredDrinks;
