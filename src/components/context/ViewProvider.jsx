import { useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ViewContext } from "./ViewContext";

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
	//
	// { replace: true } es para cambios de vista que el usuario no pidió
	// (ver el efecto de RoHome que fuerza "cuadricula" en mobile): si eso
	// empujara una entrada nueva al historial, el botón "atrás" quedaría
	// atrapado, porque volver a la vista anterior dispararía el mismo
	// efecto y te mandaría para adelante otra vez.
	const setView = useCallback(
		(nextView, { replace = false } = {}) => {
			// Importante: No uses location.search aquí directamente si quieres evitar bugs,
			// pero para mantener filtros está bien.
			navigate(`/home/${currentLang}/${nextView}${location.search}`, { replace });
		},
		[currentLang, location.search, navigate],
	);

	// 3. El valor del contexto SOLO debe cambiar si la vista o el idioma cambian.
	// setView ya depende de currentLang, no hace falta repetirlo aquí.
	const value = useMemo(
		() => ({ view: currentView, setView }),
		[currentView, setView],
	);

	return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
};
