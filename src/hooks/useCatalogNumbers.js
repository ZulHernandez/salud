import { use, useMemo } from "react";
import { useLanguage } from "../components/context/LanguageContext";
import { getCatalogoPromise } from "../utils/drinksSource";

// Número de catálogo estable para cada trago (ej. "N.07"), como el número
// de entrada de un catálogo impreso. Se calcula sobre el orden alfabético
// del catálogo COMPLETO, sin filtros activos, así que es un identificador
// del trago -no cambia cuando alguien activa/desactiva un filtro o busca,
// como sí pasaría si se numerara según la posición en la vista actual.
export function useCatalogNumbers() {
	const { t, language } = useLanguage();
	const drinks = use(getCatalogoPromise());

	return useMemo(() => {
		const collator = new Intl.Collator(language, {
			numeric: true,
			sensitivity: "base",
		});
		const keys = Object.keys(drinks).sort((a, b) =>
			collator.compare(t(a), t(b)),
		);
		const numeros = new Map();
		keys.forEach((key, index) => numeros.set(key, index + 1));
		return numeros;
	}, [drinks, language, t]);
}

export default useCatalogNumbers;
