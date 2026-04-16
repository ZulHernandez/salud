import { useView } from "../components/context/ViewContext";
import { useLanguage } from "../components/context/LanguageContext";
import { useUI } from "../components/context/UIContext";
import { useGlassFilter } from "../components/context/GlassFilterContext";
import { useEffect, useState } from "react";

import "../styles/general/route.scss";
import "../styles/pages/home.scss";

import drinks from "../utils/drinks";
import { glassware_imgs } from "../utils/glassware";

import CoList from "../components/home/CoList";
import CoCard from "../components/home/CoCard";
import CoGrid from "../components/home/CoGrid";

const sortObjectByKey = (obj) => {
    return Object.keys(obj)
        .sort()
        .reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
        }, {});
};

const groupDrinksByLetter = (obj) => {
    const sortedKeys = Object.keys(obj).sort();
    return sortedKeys.reduce((acc, key) => {
        const firstLetter = key.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = {};
        }
        acc[firstLetter][key] = obj[key];
        return acc;
    }, {});
};

const RoHome = () => {
    const { view } = useView();
    const { t } = useLanguage();
    const { viewport } = useUI();
    // Extraemos allFilters (objetos) y searchQuery (string) del contexto
    const { allFilters, searchQuery } = useGlassFilter();
    const [index, setIndex] = useState(0);

    let filteredDrinks = Object.fromEntries(
        Object.entries(drinks).filter(([key, drink]) => {
            // 1. Extraemos el nombre para el buscador y el resto para los chips
            const { name, ...restOfData } = drink;
            const searchableContent = JSON.stringify(restOfData).toLowerCase();
            const drinkName = name.toLowerCase();
            const searchLower = searchQuery.toLowerCase();

            // 2. Filtro de Chips (Vasos y Licores)
            // Cada objeto en allFilters es { text, type }
            const matchesChips = allFilters.every((filter) =>
                searchableContent.includes(filter.text.toLowerCase())
            );

            // 3. Filtro de Buscador (Busca en el nombre del trago)
            const matchesSearch = drinkName.includes(searchLower);

            // Solo pasa si cumple AMBOS
            return matchesChips && matchesSearch;
        }),
    );

    const ordDrinks = sortObjectByKey(filteredDrinks);
    const groupDrinks = groupDrinksByLetter(ordDrinks);
    const infoFinal = groupDrinks;

    useEffect(() => {
        if (!glassware_imgs || glassware_imgs.length === 0) return;

        const interval = setInterval(() => {
            setIndex((prevIndex) =>
                prevIndex === glassware_imgs.length - 1 ? 0 : prevIndex + 1,
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [glassware_imgs.length]);

    return (
        <div
            className="main"
            style={
                viewport.isMobile
                    ? { paddingTop: "20.2rem" }
                    : allFilters.length > 0
                        ? { paddingTop: "29rem" }
                        : { paddingTop: "20.2rem" }
            }
        >
            {Object.keys(filteredDrinks).length === 0 ? (
                <div className="main-no-results">
                    <img src={glassware_imgs[index]} alt="" />
                    <h2>{t("main-no-results__h2")}</h2>
                    <span>{t("main-no-results__span")}</span>
                </div>
            ) : view === "cuadricula" ? (
                <div className="main-cuadricula">
                    {Object.keys(ordDrinks).map((key, i) => (
                        <CoGrid key={i} drink={ordDrinks[key]} />
                    ))}
                </div>
            ) : (
                Object.keys(infoFinal).map((letter) => (
                    <div className={"main-" + view} key={letter}>
                        <h1>
                            {letter} (
                            {(() => {
                                let conta = Object.keys(infoFinal[letter]).length;
                                if (conta === 1) {
                                    return "1 " + t("main__bebida");
                                } else {
                                    return `${conta} ` + t("main__bebidas");
                                }
                            })()}
                            )
                        </h1>
                        {view === "tarjetas" ? (
                            <div className="cards-container">
                                {Object.keys(infoFinal[letter]).map((key, i) => (
                                    <CoCard key={i} drink={infoFinal[letter][key]} />
                                ))}
                            </div>
                        ) : (
                            Object.keys(infoFinal[letter]).map((key, i) => (
                                <CoList key={i} drink={infoFinal[letter][key]} />
                            ))
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default RoHome;