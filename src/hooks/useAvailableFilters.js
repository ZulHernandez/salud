import { use, useMemo } from "react";
import { useLanguage } from "../components/context/LanguageContext";
import { useGlassFilter } from "../components/context/GlassFilterContext";
import { getCatalogoPromise } from "../utils/drinksSource";
import { glassware_names } from "../utils/glassware";
import { licoursNames } from "../utils/licours";

// De todo el universo de vasos/licores declarado en glassware.js/licours.js,
// calcula cuáles de verdad dejan al menos un resultado si se agregan a los
// filtros ya activos (más la búsqueda actual). Antes el sidebar (CoFilterMenu)
// mostraba esas listas completas sin importar si el catálogo real las usaba,
// así que la mayoría de las opciones -y casi cualquier segunda combinación-
// llevaban a un catálogo vacío.
//
// La regla es la misma que ya usa useFilteredDrinks para los chips (AND
// entre todos los filtros activos, más la búsqueda); acá solo se prueba
// "¿y si además agrego esta opción?" una por una. Un filtro ya activo
// siempre se deja ver (para poder quitarlo desde su propio chip), aunque
// ya no sume nada nuevo.
export function useAvailableFilters() {
	const { t, language } = useLanguage();
	const { allFilters, searchQuery } = useGlassFilter();
	const drinks = use(getCatalogoPromise());

	return useMemo(() => {
		const searchLower = searchQuery.toLowerCase();
		const entradas = Object.entries(drinks);
		const yaActivos = new Set(allFilters.map((f) => `${f.type}:${f.text}`));
		// Los licores siempre se ven en orden alfabético (por su nombre
		// traducido, no por la clave técnica): un collator respeta acentos
		// y mayúsculas/minúsculas como el usuario espera, en el idioma activo.
		const collator = new Intl.Collator(language, {
			numeric: true,
			sensitivity: "base",
		});

		function algunTragoCoincideCon(candidato) {
			const filtrosAProbar = [...allFilters, candidato];
			return entradas.some(([key, drink]) => {
				if (!t(key).toLowerCase().includes(searchLower)) return false;
				return filtrosAProbar.every((f) =>
					f.type === "glass"
						? drink.glass.name === f.text
						: drink.ingredients.some((ing) => ing.alcohol.name === f.text),
				);
			});
		}

		const vasosDisponibles = glassware_names.filter(
			(nombre) =>
				yaActivos.has(`glass:${nombre}`) ||
				algunTragoCoincideCon({ type: "glass", text: nombre }),
		);

		const licoresDisponibles = licoursNames
			.filter(
				(nombre) =>
					yaActivos.has(`licours:${nombre}`) ||
					algunTragoCoincideCon({ type: "licours", text: nombre }),
			)
			.sort((a, b) => collator.compare(t(a.toLowerCase()), t(b.toLowerCase())));

		return { vasosDisponibles, licoresDisponibles };
		// IMPORTANTE: language debe estar en las deps para que se dispare el
		// re-render del orden cuando cambia el idioma (mismo motivo que en
		// useFilteredDrinks).
	}, [drinks, allFilters, searchQuery, t, language]);
}

export default useAvailableFilters;
