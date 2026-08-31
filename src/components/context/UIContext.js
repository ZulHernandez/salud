import { createContext, useContext } from "react";

export const UIContext = createContext();

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) throw new Error("useUI debe usarse dentro de UIContextProvider");
    return context;
};
