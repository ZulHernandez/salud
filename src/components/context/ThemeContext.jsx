import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();

	// Extraemos el color de la URL manualmente
	const searchParams = new URLSearchParams(location.search);
	const colorParam = searchParams.get("color") || "ff3f3f";
	const accentColor = `#${colorParam.replace("#", "")}`;

	useEffect(() => {
		document.documentElement.style.setProperty("--color-dinamico", accentColor);
	}, [accentColor]);

	const setAccentColor = (newColor) => {
		const cleanColor = newColor.replace("#", "");

		// RECONSTRUIMOS: Mantenemos el path actual (/home/es/lista)
		// y solo actualizamos el query string (?color=...)
		const newSearchParams = new URLSearchParams(location.search);
		newSearchParams.set("color", cleanColor);

		navigate(
			{
				pathname: location.pathname, // Mantiene /home/es/lista
				search: newSearchParams.toString(), // Pone el nuevo color
			},
			{ replace: true },
		);
	};

	const value = useMemo(
		() => ({ accentColor, setAccentColor }),
		[accentColor],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
