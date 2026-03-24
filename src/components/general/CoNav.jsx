import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

import "../../styles/general/CoNav.scss";

// Imports de iconos (asumiendo tu estructura de carpetas)
import icon_random from "../../assets/icons/random.svg";
import icon_lenguaje from "../../assets/icons/lenguaje.svg";
import icon_perso from "../../assets/icons/perso.svg";
import icon_buscar from "../../assets/icons/buscar.svg";
import icon_vista from "../../assets/icons/vista.svg";
import icon_filtros from "../../assets/icons/filtros.svg";
import icon_navegador from "../../assets/icons/navegador.svg";

const idiomas = [
	{ name: "español", value: "ES" },
	{ name: "english", value: "EN" },
	{ name: "日本語", value: "JP" },
	{ name: "français", value: "FR" },
];

const CoDropMenu = ({ list, action, closeMenu }) => {
	const { setLanguage } = useLanguage();

	return (
		<div className="drop-menu">
			{list.map((item, index) => (
				<React.Fragment key={item.value}>
					<div
						className="drop-menu-option"
						onClick={(e) => {
							e.stopPropagation(); // Evita que el clic active el link padre
							if (action === "language") {
								setLanguage(item.value);
							}
							closeMenu(); // Cerramos después de seleccionar
						}}
					>
						{item.name}
					</div>
					{index < list.length - 1 && <hr className="drop-menu-separator" />}
				</React.Fragment>
			))}
		</div>
	);
};

const CoNavLink = ({ name, path, icon, list, action }) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef(null); // Referencia a este componente

	// Lógica para cerrar al hacer clic fuera
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("click", handleClickOutside);
		}
		return () => document.removeEventListener("click", handleClickOutside);
	}, [isOpen]);

	return (
		<div
			className="nav-link-container"
			ref={containerRef}
			style={{ position: "relative" }}
		>
			<a
				href={path || "#"}
				className="nav-link-wrapper"
				onClick={(e) => {
					if (list) {
						e.preventDefault(); // No navega si tiene menú
						setIsOpen(!isOpen); // Abre/Cierra
					}
				}}
			>
				<div className="navbar-head-links-element">
					<div className="navbar-head-links-element-info">
						<span>{name}</span>
						{icon && <img src={icon} alt={name} />}
					</div>
				</div>
			</a>

			{/* Solo se renderiza si está abierto y hay lista */}
			{list && isOpen && (
				<CoDropMenu
					list={list}
					action={action}
					closeMenu={() => setIsOpen(false)}
				/>
			)}
		</div>
	);
};

const CoInput = ({ placeholder }) => {
	return (
		<div className="navbar-browse-input">
			<input type="text" placeholder={placeholder} />
			<img src={icon_buscar} alt={placeholder} />
		</div>
	);
};

const CoNav = () => {
	const { t } = useLanguage();

	const navBrowseLinks = [
	{ name: t("navbar-browse-links__vista"), path: "/", icon: icon_vista, list: null },
	{ name: t("navbar-browse-links__filtros"), path: "/", icon: icon_filtros, list: null },
	{ name: "", path: "/", icon: icon_navegador, list: null },
];

	const navHeadLinks = [
		{ name: t("navbar-head-links__aleatorio"), icon: icon_random },
		{ name: t("navbar-head-links__personalizacion"), icon: icon_perso },
		{ name: t("navbar-head-links__idioma"), list: idiomas, icon: icon_lenguaje, action: "language" },
	];

	return (
		<div className="navbar">
			<div className="navbar-head">
				<div className="navbar-head-logo">
					<h1>{t("navbar-head-logo__h1")}</h1>
					<h3>{t("navbar-head-logo__h3")}</h3>
				</div>
				<div className="navbar-head-links">
					{navHeadLinks.map((link) => (
						<CoNavLink
							key={link.name} // Key único para el link
							name={link.name}
							path={link.path}
							icon={link.icon}
							list={link.list}
							action={link.action}
						/>
					))}
				</div>
			</div>

			<div className="navbar-browse">
				<CoInput placeholder={t("navbar-browse-input__placeholder")} />
				<div className="navbar-browse-links">
					{navBrowseLinks.map((link, index) => (
						<CoNavLink
							key={index} // Key único basado en índice o nombre
							name={link.name}
							path={link.path}
							icon={link.icon}
							list={link.list}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default CoNav;
