import { useView } from "../components/context/ViewContext";
import { useLanguage } from "../components/context/LanguageContext";
import { useUI } from "../components/context/UIContext";
import { useGlassFilter } from "../components/context/GlassFilterContext";
import { useCatalog } from "../components/context/CatalogContext";
import { useEffect, useState } from "react";

import "../styles/general/route.scss";
import "../styles/pages/home.scss";

import { glassware_imgs } from "../utils/glassware";

import CoList from "../components/home/CoList";
import CoCard from "../components/home/CoCard";
import CoGrid from "../components/home/CoGrid";

const RoHome = () => {
	const { view, setView } = useView();
	const { t } = useLanguage();
	const { viewport } = useUI();
	const { allFilters } = useGlassFilter();
	const { infoFinal, rows, virtualizer, listRef } = useCatalog();
	const [index, setIndex] = useState(0);

	const siguienteImagen = () => {
		setIndex((prevIndex) =>
			// Si el índice es el último, vuelve a 0; si no, suma 1
			prevIndex === glassware_imgs.length - 1 ? 0 : prevIndex + 1,
		);
	};
	useEffect(() => {
		const intervalo = setInterval(siguienteImagen, 1000); // Cambia cada 3 seg
		return () => clearInterval(intervalo); // Limpieza al desmontar
	}, []);

	// Sync de vista para móviles. { replace: true } para no ensuciar el
	// historial: si esto empujara una entrada nueva, el botón "atrás"
	// quedaría atrapado (volver a la vista anterior re-dispara este mismo
	// efecto y te manda para adelante otra vez).
	useEffect(() => {
		if (viewport.isMobile && view !== "cuadricula") {
			setView("cuadricula", { replace: true });
		}
	}, [viewport.isMobile, view, setView]);

	// Pinta una fila del listado virtualizado según su tipo. La forma de cada
	// fila la arma useCatalogRows (ver src/hooks) según la vista activa.
	const renderRow = (row) => {
		switch (row.type) {
			case "header":
				return (
					<h1>
						{row.letter} (
						{row.count === 1
							? `1 ${t("main__bebida")}`
							: `${row.count} ${t("main__bebidas")}`}
						)
					</h1>
				);
			case "drink":
				return (
					<div className="main-lista">
						<CoList drink={row.drink} />
					</div>
				);
			case "letter-section":
				return (
					<div className="main-tarjetas">
						<h1>
							{row.letter} (
							{row.drinks.length === 1
								? `1 ${t("main__bebida")}`
								: `${row.drinks.length} ${t("main__bebidas")}`}
							)
						</h1>
						<div className="cards-container">
							{row.drinks.map((drink) => (
								<CoCard key={drink.key} drink={drink} />
							))}
						</div>
					</div>
				);
			case "grid-row":
				return (
					<div className="main-cuadricula">
						{row.drinks.map((drink) => (
							<CoGrid key={drink.key} drink={drink} />
						))}
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div
			className="main"
			style={{
				paddingTop:
					viewport.isMobile || allFilters.length === 0 ? "20.2rem" : "29rem",
				paddingLeft:
					infoFinal.length === 0
						? "0rem"
						: view === "cuadricula"
							? "2rem"
							: "12rem",
			}}
		>
			{infoFinal.length === 0 ? (
				<div className="main-no-results">
					<img src={glassware_imgs[index]} alt="No results" />
					<h2>{t("main-no-results__h2")}</h2>
					<span>{t("main-no-results__span")}</span>
				</div>
			) : (
				<div
					ref={listRef}
					style={{
						position: "relative",
						width: "100%",
						height: virtualizer.getTotalSize(),
					}}
				>
					{virtualizer.getVirtualItems().map((virtualRow) => (
						<div
							key={virtualRow.key}
							data-index={virtualRow.index}
							ref={virtualizer.measureElement}
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								transform: `translateY(${
									virtualRow.start - virtualizer.options.scrollMargin
								}px)`,
							}}
						>
							{renderRow(rows[virtualRow.index])}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default RoHome;
