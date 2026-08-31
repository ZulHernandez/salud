import { createContext, useContext } from "react";

export const GlassFilterContext = createContext();

export const useGlassFilter = () => {
    const context = useContext(GlassFilterContext);
    if (!context) {
        throw new Error("useGlassFilter debe usarse dentro de un GlassFilterProvider");
    }
    return context;
};
