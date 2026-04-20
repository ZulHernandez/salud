import { useView } from "../components/context/ViewContext";
import { useLanguage } from "../components/context/LanguageContext";
import { useUI } from "../components/context/UIContext";
import { useGlassFilter } from "../components/context/GlassFilterContext";
import { useEffect, useState, useMemo } from "react"; // Añadido useMemo

import "../styles/general/route.scss";
import "../styles/pages/home.scss";

import drinks from "../utils/drinks";
import { glassware_imgs } from "../utils/glassware";

import CoList from "../components/home/CoList";
import CoCard from "../components/home/CoCard";
import CoGrid from "../components/home/CoGrid";

const RoHome = () => {
    const { view, setView } = useView();
    const { t, language } = useLanguage(); // Asegúrate de exportar 'translations' en tu Context
    const { viewport } = useUI();
    const { allFilters, searchQuery } = useGlassFilter();
    const [index] = useState(0);

    // 1. Obtener los nombres traducidos ANTES de ordenar
    // Esto nos asegura que el Collator compare strings reales del idioma actual
    const infoFinal = useMemo(() => {
        const collator = new Intl.Collator(language, {
            numeric: true,
            sensitivity: 'base'
        });

        // Filtramos primero
        const filtered = Object.entries(drinks).filter(([key, drink]) => {
            const translatedName = t(key).toLowerCase();
            const searchLower = searchQuery.toLowerCase();
            
            // Filtro de chips (buscamos en la data cruda del trago)
            const searchableContent = JSON.stringify(drink).toLowerCase();
            const matchesChips = allFilters.every((f) =>
                searchableContent.includes(f.text.toLowerCase())
            );

            return matchesChips && translatedName.includes(searchLower);
        });

        // Ordenamos por la traducción
        const sorted = filtered.sort((a, b) => {
            return collator.compare(t(a[0]), t(b[0]));
        });

        // Agrupamos en un Array
        return sorted.reduce((acc, [key, data]) => {
            const translatedName = t(key);
            const firstLetter = translatedName.charAt(0).toUpperCase();
            
            let group = acc.find(g => g.letter === firstLetter);
            if (!group) {
                group = { letter: firstLetter, drinks: [] };
                acc.push(group);
            }
            group.drinks.push({ key, ...data });
            return acc;
        }, []);

    // IMPORTANTE: language debe estar aquí para que se dispare el re-render
    }, [language, searchQuery, allFilters, t]);

    const ordDrinks = useMemo(() => infoFinal.flatMap(g => g.drinks), [infoFinal]);

	// Sync de vista para móviles
	useEffect(() => {
		if (viewport.isMobile && view !== "cuadricula") {
			setView("cuadricula");
		}
	}, [viewport.isMobile, view, setView]);

	// ... (tu useEffect del intervalo se mantiene igual)

	return (
		<div
			className="main"
			style={{
				paddingTop:
					viewport.isMobile || allFilters.length === 0 ? "20.2rem" : "29rem",
				paddingLeft:
					view === "cuadricula" ? "2rem" : "12rem",
			}}
		>
			{infoFinal.length === 0 ? (
				<div className="main-no-results">
					<img src={glassware_imgs[index]} alt="No results" />
					<h2>{t("main-no-results__h2")}</h2>
					<span>{t("main-no-results__span")}</span>
				</div>
			) : view === "cuadricula" ? (
				<div className="main-cuadricula">
					{ordDrinks.map((drink) => (
						<CoGrid key={drink.key} drink={drink} />
					))}
				</div>
			) : (
				infoFinal.map((group) => (
					<div className={"main-" + view} key={group.letter}>
						<h1 style={{scrollMarginTop: "20rem"}} id={"seccion-" + group.letter.toLowerCase()}>
							{group.letter} (
							{group.drinks.length === 1
								? `1 ${t("main__bebida")}`
								: `${group.drinks.length} ${t("main__bebidas")}`}
							)
						</h1>
						<div className={view === "tarjetas" ? "cards-container" : ""}>
							{group.drinks.map((drink) =>
								view === "tarjetas" ? (
									<CoCard key={drink.key} drink={drink} />
								) : (
									<CoList key={drink.key} drink={drink} />
								),
							)}
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default RoHome;
