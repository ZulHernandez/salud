import { createContext, useContext } from "react";

export const CatalogContext = createContext();

export const useCatalog = () => {
	const context = useContext(CatalogContext);
	if (!context) {
		throw new Error("useCatalog debe usarse dentro de un CatalogProvider");
	}
	return context;
};
