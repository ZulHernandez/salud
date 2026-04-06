import React, { createContext, useContext, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const ViewContext = createContext();

export const ViewContextProvider = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();

	// /home/es/lista -> ["", "home", "es", "lista"]
	const pathSegments = location.pathname.split("/");
	const currentLang = pathSegments[2] || "es";
	const currentView = pathSegments[3] || "lista";

	const setView = (nextView) => {
		const newPath = `/home/${currentLang}/${nextView}`;

		navigate({
			pathname: newPath,
			search: location.search, // Mantenemos el ?color=...
		});
	};

	const value = useMemo(
		() => ({ view: currentView, setView }),
		[currentView, currentLang, location.search],
	);

	return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
};

export const useView = () => useContext(ViewContext);
