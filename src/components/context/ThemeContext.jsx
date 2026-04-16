import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import colores from "../../utils/colorTheme";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);

	// 1. LEER: Obtenemos el nombre de la URL (ej: ?color=menta)
	// Si no existe, usamos el primero ("granada")
	const colorName = searchParams.get("color") || colores[0].name;

	// 2. BUSCAR: Encontramos el objeto completo que coincida con el nombre
	const activeColorObj = useMemo(() => {
		return colores.find((c) => c.name === colorName) || colores[0];
	}, [colorName]);

	// El valor hexadecimal para el CSS (--color-dinamico)
	const accentColor = activeColorObj.value;

	useEffect(() => {
		document.documentElement.style.setProperty("--color-dinamico", accentColor);
	}, [accentColor]);

	// 3. ESCRIBIR: Actualizamos la URL con el nombre
	// 3. ESCRIBIR: Actualizamos la URL con el nombre de forma silenciosa
    // 3. ESCRIBIR: Actualizamos la URL con el nombre sin que React Router se meta
    const setAccentColor = (newName) => {
        // 1. Construimos la nueva URL manualmente
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("color", newName);

        // 2. Obtenemos el path actual (ej: /home/es/cuadricula)
        const currentPath = window.location.pathname;
        const newUrl = `${currentPath}?${searchParams.toString()}`;

        // 3. CAMBIO SILENCIOSO: Actualiza la barra de direcciones 
        // sin que React Router se entere. Esto evita que App.jsx 
        // te mande a la vista por defecto "lista".
        window.history.replaceState(null, "", newUrl);

        // 4. FORZAR ACTUALIZACIÓN DE UI:
        // Como no usamos navigate, hay que avisarle a React que el color cambió.
        // Solo necesitamos que este componente se vuelva a renderizar.
        // Puedes usar un pequeño estado interno si ves que el color no cambia al clickear.
        window.dispatchEvent(new PopStateEvent('popstate')); 
    };

	const value = useMemo(
		() => ({
			accentColor, // El #HEX
			colorName, // El nombre ("granada")
			setAccentColor, // La función para cambiarlo
		}),
		[accentColor, colorName],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
