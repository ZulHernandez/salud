import close from "../../assets/icons/close--white.svg";
import "../../styles/general/CoFilter.scss";

import glassware from "../../utils/glassware"; // El objeto con los imports de SVGs
import licours from "../../utils/licours";
import { useLanguage } from "../context/LanguageContext";
import { useGlassFilter } from "../context/GlassFilterContext";

const CoFilter = ({ text, type }) => {
	const { t } = useLanguage();
	const { toggleGlass, toggleSpirit, allFilters } = useGlassFilter();

	const technicalKey = text?.toLowerCase();

	// 1. Decidimos qué icono o color mostrar
	const iconEntry = glassware[technicalKey];
	const licourEntry = licours[technicalKey];

	// 2. Verificamos si este filtro específico está activo
	const isActive = allFilters.some((f) => f.text === text);

	// 3. LA CLAVE: Seleccionar la función de toggle correcta según el tipo
	const handleToggle = () => {
		if (type === "licours") {
			toggleSpirit(text);
		} else {
			toggleGlass(text);
		}
	};

	return (
		<div
			className={`filter-toogle${isActive ? "--active" : ""}`}
			onClick={handleToggle} // <--- Ahora sí sabe qué filtrar
		>
			{type === "licours" ? (
				<div
					style={{
						backgroundColor: licourEntry?.color || "#ccc",
						width: "1rem",
						height: "1rem",
						borderRadius: "50%",
						border: "#333 dashed 3px",
						flexShrink: 0,
					}}
				></div>
			) : (
				<>
					<img
						className="filter-toogle-icon--white"
						src={iconEntry?.fillWhite}
						alt={t(technicalKey)}
					/>
					<img
						className="filter-toogle-icon"
						src={iconEntry?.fillBlack}
						alt={t(technicalKey)}
					/>
				</>
			)}
			<span>{t(technicalKey)}</span>
			<img className="filter-toogle-close" src={close} alt="close" />
		</div>
	);
};

export default CoFilter;
