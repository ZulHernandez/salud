import React, { createContext, useContext, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { translations } from "../../utils/i18n";

export const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();

	// Extraemos el idioma directamente del path: /home/es/lista -> es
	const pathSegments = location.pathname.split("/");
	const langFromPath = pathSegments[2];

	const language = useMemo(
		() => langFromPath?.toUpperCase() || "ES",
		[langFromPath],
	);

	const t = (key) => {
		return (
			translations[language]?.[key] ||
			translations[language]?.glassware?.[key] ||
			translations[language]?.themeColors?.[key] || // Buscamos en el nuevo objeto de colores
			translations[language]?.licours?.[key] || // Buscamos en el nuevo objeto de filtros
			key
		);
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
		() => ({ language, setLanguage, t }),
		[language, location.pathname, location.search],
	);

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => useContext(LanguageContext);
