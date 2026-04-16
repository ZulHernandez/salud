import React, { createContext, useContext, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const ViewContext = createContext();

export const ViewContextProvider = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();

	// 1. Calculamos la vista actual directamente del pathname (Sin useMemo para esto)
	// Esto es síncrono y siempre reflejará la realidad de la URL
	const viewsAllowed = ["lista", "tarjetas", "cuadricula"];
	const pathSegments = location.pathname.split("/");
	const currentView =
		viewsAllowed.find((v) => pathSegments.includes(v)) || "lista";
	const currentLang = pathSegments[2] || "es";

	// 2. Definimos setView.
	// USAMOS un callback para que la función no cambie a menos que sea necesario
	const setView = React.useCallback(
		(nextView) => {
			// Importante: No uses location.search aquí directamente si quieres evitar bugs,
			// pero para mantener filtros está bien.
			navigate(`/home/${currentLang}/${nextView}${location.search}`);
		},
		[currentLang, location.search, navigate],
	);

	// 3. El valor del contexto SOLO debe cambiar si la vista o el idioma cambian.
	// QUITAMOS location.search de aquí. Los filtros no deberían reconstruir el ViewContext.
	const value = useMemo(
		() => ({ view: currentView, setView }),
		[currentView, currentLang, setView],
	);

	return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
};

export const useView = () => useContext(ViewContext);
