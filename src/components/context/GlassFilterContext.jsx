import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BitmaskService } from "../../utils/bitmask";
import { glassware_names } from "../../utils/glassware";
import { licoursNames } from "../../utils/licours";

export const GlassFilterContext = createContext();

export const GlassFilterProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // --- 1. LECTURA INTEGRADA (Chips + Search) ---
    const { activeFilters, searchQuery } = useMemo(() => {
        const searchParams = new URLSearchParams(location.search);

        // Decodificamos Cristalería (parámetro 'g')
        const gHex = searchParams.get("g");
        const glass = gHex ? BitmaskService.decode(gHex, glassware_names) : [];

        // Decodificamos Licores (parámetro 's')
        const sHex = searchParams.get("s");
        const spirits = sHex ? BitmaskService.decode(sHex, licoursNames) : [];

        // Leemos búsqueda (parámetro 'q')
        const q = searchParams.get("q") || "";

        return { 
            activeFilters: { glass, spirits }, 
            searchQuery: q 
        };
    }, [location.search]);

    // --- 2. LÓGICA DE TOGGLE (Para los Chips) ---
    const toggleFilter = useCallback(
        (name, type) => {
            const isGlass = type === "glass";
            const currentList = isGlass ? activeFilters.glass : activeFilters.spirits;
            const pool = isGlass ? glassware_names : licoursNames;
            const paramKey = isGlass ? "g" : "s";

            const next = currentList.includes(name)
                ? currentList.filter((f) => f !== name)
                : [...currentList, name];

            const hex = BitmaskService.encode(next, pool);
            const newParams = new URLSearchParams(location.search);

            if (hex !== "0" && hex !== "") {
                newParams.set(paramKey, hex);
            } else {
                newParams.delete(paramKey);
            }

            navigate(
                { pathname: location.pathname, search: newParams.toString() },
                { replace: true }
            );
        },
        [activeFilters, location.pathname, location.search, navigate]
    );

    // --- 3. LÓGICA DE BÚSQUEDA (Para el input) ---
    const setSearchQuery = useCallback(
        (val) => {
            const newParams = new URLSearchParams(location.search);
            
            if (val) {
                newParams.set("q", val);
            } else {
                newParams.delete("q");
            }

            navigate(
                { pathname: location.pathname, search: newParams.toString() },
                { replace: true }
            );
        },
        [location.pathname, location.search, navigate]
    );

    // --- 4. VALORES EXPUESTOS ---
    const value = useMemo(
        () => ({
            activeGlass: activeFilters.glass,
            activeSpirits: activeFilters.spirits,
            searchQuery, // El texto actual del buscador
            setSearchQuery, // La función para actualizar la búsqueda
            totalFilters: activeFilters.glass.length + activeFilters.spirits.length,
            toggleGlass: (name) => toggleFilter(name, "glass"),
            toggleSpirit: (name) => toggleFilter(name, "licours"),
            
            // Mapeo para los chips de la UI
            allFilters: [
                ...activeFilters.glass.map((name) => ({ text: name, type: "glass" })),
                ...activeFilters.spirits.map((name) => ({ text: name, type: "licours" })),
            ],
        }),
        [activeFilters, toggleFilter, searchQuery, setSearchQuery]
    );

    return (
        <GlassFilterContext.Provider value={value}>
            {children}
        </GlassFilterContext.Provider>
    );
};

export const useGlassFilter = () => {
    const context = useContext(GlassFilterContext);
    if (!context) {
        throw new Error("useGlassFilter debe usarse dentro de un GlassFilterProvider");
    }
    return context;
};