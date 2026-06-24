import "../../styles/general/CoIndex.scss";

import { useUI } from "../context/UIContext";
import { useLanguage } from "../context/LanguageContext";
import { useMemo } from "react";
import { useGlassFilter } from "../context/GlassFilterContext";

import drinks from "../../utils/drinks";

const CoIndex = () => {
	const { isNavVisible} = useUI();
	const { t, language } = useLanguage(); // Asegúrate de exportar 'translations' en tu Context
    const { allFilters, searchQuery } = useGlassFilter();

	const infoFinal = useMemo(() => {
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
		
		let letters = [];

		// Agrupamos en un Array
		return sorted.reduce((acc, [key, data]) => {
			const translatedName = t(key);
			const firstLetter = translatedName.charAt(0).toUpperCase();

			letters.push(firstLetter.toLowerCase());
			console.log("letras:", letters);

			let group = acc.find((g) => g.letter === firstLetter);			

			if (!group) {
				group = { letter: firstLetter, drinks: [] };
				acc.push(group);
			}
			group.drinks.push({ key, ...data });
			return acc;
		}, []);

		// IMPORTANTE: language debe estar aquí para que se dispare el re-render
	}, [language, searchQuery, allFilters, t]);

    const inicialesUnicas = [...new Set(infoFinal.map((g) => g.letter))];

	return (
		<div className={`index${!isNavVisible ? "--short" : ""}`}>
			{inicialesUnicas.map((letra) => (
                <a
                    href={`#seccion-${letra.toLowerCase()}`}
                    key={letra}
                >
                    {letra.toLowerCase()}
                </a>
            ))}
		</div>
	);
};

export default CoIndex;
