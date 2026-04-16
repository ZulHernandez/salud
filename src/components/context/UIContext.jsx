import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
    useRef,
} from "react";

export const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(true);
    
    // --- Nuevo: Estado del Viewport ---
    const [viewport, setViewport] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024
    });

    const lastScrollY = useRef(0);

    // --- Lógica de la Sidebar ---
    const openSidebar = () => setIsSidebarOpen(true);
    const closeSidebar = () => setIsSidebarOpen(false);
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    useEffect(() => {
        document.body.style.overflow = isSidebarOpen ? "hidden" : "unset";
    }, [isSidebarOpen]);

    // --- Efecto para el Resize (Viewport) ---
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setViewport({
                width: width,
                height: window.innerHeight,
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // --- UX: Ocultar Nav al hacer Scroll ---
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Solo ejecutamos la lógica de ocultar si no estamos en la parte superior (puedes ajustar el 200)
            if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
                setIsNavVisible(false);
            } else {
                setIsNavVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const value = useMemo(
        () => ({
            isSidebarOpen,
            isNavVisible,
            viewport, // Exportamos la información del tamaño de pantalla
            openSidebar,
            closeSidebar,
            toggleSidebar,
        }),
        [isSidebarOpen, isNavVisible, viewport], // Agregamos viewport a las dependencias
    );

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) throw new Error("useUI debe usarse dentro de UIContextProvider");
    return context;
};