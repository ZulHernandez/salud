import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useView } from "../context/ViewContext";
import { useTheme } from "../context/ThemeContext";

import "../../styles/general/CoNav.scss";

// Imports de iconos (asumiendo tu estructura de carpetas)
import icon_random from "../../assets/icons/random.svg";
import icon_lenguaje from "../../assets/icons/lenguaje.svg";
import icon_perso from "../../assets/icons/perso.svg";
import icon_buscar from "../../assets/icons/buscar.svg";
import icon_list from "../../assets/icons/list.svg";
import icon_card from "../../assets/icons/card.svg";
import icon_filtros from "../../assets/icons/filtros.svg";
import icon_navegador from "../../assets/icons/navegador.svg";

const idiomas = [
	{ name: "español", value: "ES" },
	{ name: "english", value: "EN" },
	{ name: "日本語", value: "JP" },
	{ name: "français", value: "FR" },
	{ name: "русский", value: "RS" },
];

const CoDropMenu = ({ list, action, closeMenu }) => {
	const { setLanguage } = useLanguage();
	const { accentColor, setAccentColor } = useTheme();
	const { t } = useLanguage();

	switch (action) {
		case "color":
			return (
				<div className="drop-menu">
					<div className="drop-menu-pallete">
						{list.map((item, index) => (
							<div
								className="drop-menu-pallete-color"
								key={item.value}
								style={{ backgroundColor: item.value }}
								onClick={(e) => {
									e.stopPropagation();
									if (action === "language") {
										setLanguage(item.value);
									} else if (action === "color") {
										// Usamos el contexto para que se guarde en la URL
										setAccentColor(item.value);
									}
									closeMenu();
								}}
							></div>
						))}
					</div>
					<hr />
					<div className="drop-menu-selected-color" style={{backgroundColor: accentColor}}>
						{(() => {
							const colorEncontrado = list.find(
								(c) => c.value.toLowerCase() === accentColor.toLowerCase(),
							);

							// Si lo encuentra, le pasamos solo el nombre (ej. "pitaya") a t()
							// La función t() ahora buscará automáticamente en translations[language].themeColors["pitaya"]
							return colorEncontrado
								? t(colorEncontrado.name)
								: "Personalizado";
						})()}
					</div>
				</div>
			);
			break;
		default:
			return (
				<div className="drop-menu">
					{list.map((item, index) => (
						<React.Fragment key={item.value}>
							<div
								className="drop-menu-option"
								onClick={(e) => {
									e.stopPropagation();
									if (action === "language") {
										setLanguage(item.value);
									}
								}}
							>
								{action === "color" && (
									<div
										style={{
											backgroundColor: item.value,
											width: "1.2rem",
											height: "1.2rem",
											borderRadius: "50%",
											marginRight: "0.5rem",
											aspectRatio: "1 / 1",
										}}
									></div>
								)}
								<span>{item.name}</span>
							</div>
							<hr />
						</React.Fragment>
					))}
				</div>
			);
			break;
	}
};

const CoNavLink = ({ name, path, icon, list, action }) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef(null);
	const { view, setView } = useView();

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
					e.preventDefault();

					if (action === "toggleView") {
						// Simplemente disparamos el cambio, el Contexto hará el resto con la URL
						const nextView = view === "lista" ? "tarjetas" : "lista";
						setView(nextView);
					}

					if (list) {
						setIsOpen(!isOpen);
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
	const { view } = useView();

	// 1. PRIMERO definimos el array de colores con sus traducciones
	const colores = [
		{ name: "granada", value: "#FF3F3F" },
		{ name: "mandarina", value: "#FF783F" },
		{ name: "mango", value: "#D59900" },
		{ name: "manzana", value: "#51BA00" },
		{ name: "menta", value: "#00BB7C" },
		{ name: "mora", value: "#00B4C5" },
		{ name: "arandano", value: "#3F88FF" },
		{ name: "zarzamora", value: "#653FFF" },
		{ name: "uva", value: "#CF3FFF" },
		{ name: "pitaya", value: "#FF3F8C" },
		{ name: "higo", value: "#333333" },
	];

	// 2. DESPUÉS definimos los links que usan ese array
	const navHeadLinks = [
		{
			name: t("navbar-head-links__personalizacion"),
			list: colores, // Ahora 'colores' ya existe
			icon: icon_perso,
			action: "color",
		},
		{
			name: t("navbar-head-links__idioma"),
			list: idiomas,
			icon: icon_lenguaje,
			action: "language",
		},
		{ name: t("navbar-head-links__aleatorio"), icon: icon_random },
	];

	const navBrowseLinks = [
		{
			name: t(`navbar-browse-links__${view}`),
			path: "/",
			icon: view === "lista" ? icon_list : icon_card,
			action: "toggleView",
		},
		{
			name: t("navbar-browse-links__filtros"),
			path: "/",
			icon: icon_filtros,
			list: null,
		},
		{ name: "", path: "/", icon: icon_navegador, list: null },
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
							key={link.name}
							name={link.name}
							path={link.path}
							icon={link.icon}
							list={link.list}
							action={link.action}
						/>
					))}
				</div>
			</div>

			{/* <div className="navbar-browse">
				<CoInput placeholder={t("navbar-browse-input__placeholder")} />
				<div className="navbar-browse-links">
					{navBrowseLinks.map((link, index) => (
						<CoNavLink
							key={index}
							name={link.name}
							path={link.path}
							icon={link.icon}
							list={link.list}
							action={link.action}
						/>
					))}
				</div>
			</div> */}
		</div>
	);
};

export default CoNav;
