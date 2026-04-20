import React, { createContext, useContext, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { translations } from "../../utils/i18n";
import drinks from "../../utils/drinks";

export const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();

	// Extraemos el idioma directamente del path: /home/es/lista -> es
	const pathSegments = location.pathname.split("/");
	const langFromPath = pathSegments[2];

	const language = useMemo(
		() => langFromPath?.toLowerCase() || "es",
		[langFromPath],
	);

	const t = (key) => {
		return (
			translations[language]?.[key] ||
			translations[language]?.glassware?.[key] ||
			translations[language]?.themeColors?.[key] || // Buscamos en el nuevo objeto de colores
			translations[language]?.licours?.[key] || // Buscamos en el nuevo objeto de filtros
			translations[language]?.drinks?.[key] || // Buscamos en el nuevo objeto de tragos
			key
		);
	};

	const getSortedDrinks = (drinksObj) => {
		const collator = new Intl.Collator(language, {
			numeric: true,
			sensitivity: "accent",
		});

		// 1. Convertimos el objeto en un array de sus llaves
		return Object.keys(drinksObj)
			.sort((a, b) => {
				// 2. Buscamos la traducción de cada nombre
				// Asumo que en tu JSON de traducciones, los nombres de los drinks
				// están bajo la propiedad "drinks"
				const nameA = translations[language]?.drinks?.[a] || a;
				const nameB = translations[language]?.drinks?.[b] || b;

				// 3. Comparamos usando el orden local (Japonés, Ruso, etc.)
				return collator.compare(nameA, nameB);
			})
			.reduce((acc, key) => {
				// 4. (Opcional) Reconstruimos el objeto ordenado
				acc[key] = drinksObj[key];
				return acc;
			}, {});
	};

	const setLanguage = (newLang) => {
		const lowerLang = newLang.toLowerCase();
		const segments = [...location.pathname.split("/")];

		if (segments.length >= 3) {
			segments[2] = lowerLang;
		}

		const newPath = segments.join("/");

		navigate({
			pathname: newPath,
			search: location.search, // Mantenemos el ?color=...
		});
	};

	const value = useMemo(
		() => ({ language, setLanguage, t, getSortedDrinks }),
		[language, location.pathname, location.search],
	);

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => useContext(LanguageContext);
