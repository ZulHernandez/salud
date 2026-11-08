import "../../styles/general/CoFilterMenu.scss";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

import { useAvailableFilters } from "../../hooks/useAvailableFilters";
import { useUI } from "../context/UIContext";

import CoFilter from "./CoFilter";

import icon_chevron from "../../assets/icons/chevron.svg";

const CoColapsable = ({ title, list, desc, type }) => {
	const { t } = useLanguage();
	const [isOpen, setIsOpen] = useState(true);

	// Si ninguna opción de esta sección deja resultados con lo que ya está
	// activo/buscado, no tiene caso mostrar un encabezado colapsable vacío.
	if (list.length === 0) return null;

	return (
		<div className="colapsable">
			{desc && <span className="colapsable-desc">{desc}</span>}
			<div className="colapsable-header" onClick={() => setIsOpen(!isOpen)}>
				<h3>
					{t(title)}{" "}
					<span className="colapsable-header-count">({list.length})</span>
				</h3>
				<img
					style={
						isOpen
							? { transform: "rotate(180deg)" }
							: { transform: "rotate(0deg)" }
					}
					src={icon_chevron}
					alt="toggle"
				/>
			</div>
			{isOpen && (
				<div className="colapsable-content">
					{list.map((item) => (
						<CoFilter key={item} text={item} type={type} />
					))}
				</div>
			)}
		</div>
	);
};

const CoFilterMenu = () => {
	const { t } = useLanguage();
	const { accentColor } = useTheme();
	const { toggleSidebar, isSidebarOpen } = useUI();
	const { vasosDisponibles, licoresDisponibles } = useAvailableFilters();

	return (
		<div className={`sidebar${!isSidebarOpen ? "--close" : ""}`}>
			<div className="sidebar-head">
				<h2>{t("navbar-browse-links__filtros")}</h2>
				<div className="sidebar-head-close" onClick={toggleSidebar}>
					<svg
						width="24"
						height="24"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 4L4 12M4 4L12 12"
							stroke={accentColor}
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</div>
			<div className="sidebar-body">
				<CoColapsable
					title="colapsable-title__vasos"
					list={vasosDisponibles}
					desc={t("colapsable-desc__general")}
					type={"glassware"}
				/>
				<CoColapsable
					title="colapsable-title__licores"
					list={licoresDisponibles}
					desc={null}
					type={"licours"}
				/>
			</div>
		</div>
	);
};

export default CoFilterMenu;
