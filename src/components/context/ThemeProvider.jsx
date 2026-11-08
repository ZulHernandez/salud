import { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import colores from "../../utils/colorTheme";
import { ThemeContext } from "./ThemeContext";

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
	// Su complementario (--color-complementario): mismo tono/saturación,
	// matiz opuesto -ver colorTheme.js-, para el par de contraste tipo
	// "etiqueta impresa" (la pastilla del número de catálogo, por ahora).
	const complementColor = activeColorObj.complement;

	useEffect(() => {
		document.documentElement.style.setProperty("--color-dinamico", accentColor);
		document.documentElement.style.setProperty(
			"--color-complementario",
			complementColor,
		);
	}, [accentColor, complementColor]);

	// 3. ESCRIBIR: igual que GlassFilterProvider con sus propios params (g/s/q),
	// navigate(..., { replace: true }) sobre el mismo pathname: cambia solo
	// el querystring sin meter una entrada nueva al historial ni tocar la
	// vista activa (que se calcula aparte, a partir del pathname).
	const setAccentColor = useCallback(
		(newName) => {
			const newParams = new URLSearchParams(location.search);
			newParams.set("color", newName);
			navigate(
				{ pathname: location.pathname, search: newParams.toString() },
				{ replace: true },
			);
		},
		[location.pathname, location.search, navigate],
	);

	const value = useMemo(
		() => ({
			accentColor, // El #HEX
			colorName, // El nombre ("granada")
			setAccentColor, // La función para cambiarlo
		}),
		[accentColor, colorName, setAccentColor],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};
