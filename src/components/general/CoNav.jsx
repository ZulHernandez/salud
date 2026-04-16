import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useView } from "../context/ViewContext";
import { useTheme } from "../context/ThemeContext";
import { useUI } from "../context/UIContext";
import { useGlassFilter } from "../context/GlassFilterContext";

import "../../styles/general/CoNav.scss";
import colores from "../../utils/colorTheme";

// Imports de iconos (asumiendo tu estructura de carpetas)
import icon_random from "../../assets/icons/random.svg";
import icon_lenguaje from "../../assets/icons/lenguaje.svg";
import icon_perso from "../../assets/icons/perso.svg";
import icon_buscar from "../../assets/icons/buscar.svg";
import icon_list from "../../assets/icons/list.svg";
import icon_card from "../../assets/icons/card.svg";
import icon_grid from "../../assets/icons/grid.svg";
import icon_filtros from "../../assets/icons/filtros.svg";
import { useLocation } from "react-router-dom";

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
						{list.map((item) => (
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
										setAccentColor(item.name);
									}
									closeMenu();
								}}
							></div>
						))}
					</div>
					<hr />
					<div
						className="drop-menu-selected-color"
						style={{ backgroundColor: accentColor }}
					>
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
		default:
			return (
				<div className="drop-menu">
					{list.map((item) => (
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
	}
};

const CoNavLink = ({ name, path, icon, list, action }) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef(null);
	const { view, setView } = useView();
	const { toggleSidebar } = useUI();

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
						const nextView =
							view === "lista"
								? "tarjetas"
								: view === "tarjetas"
									? "cuadricula"
									: "lista";
						console.log(nextView);

						setView(nextView);
					} else if (action === "toggleSidebar") {
						toggleSidebar();
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

	const { searchQuery, setSearchQuery } = useGlassFilter();
	
	return (
		<div className="navbar-browse-input">
			<input
				type="text"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder="Buscar cóctel..."
				placeholder={placeholder}
			/>
			<img src={icon_buscar} alt={placeholder} />
		</div>
	);
};

const CoNav = () => {
	const { t } = useLanguage();
	const { view, setView } = useView();
	const location = useLocation();
	const { isNavVisible, viewport } = useUI();
	const isHome = location.pathname.startsWith("/home");
	const { activeGlass, activeSpirits, totalFilters } = useGlassFilter();

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

	// SUSTITUYE las líneas de splice y setView por esto:
	const navBrowseLinks = [];

	// 1. Solo añadimos el botón de vista si NO es móvil
	if (!viewport.isMobile) {
		navBrowseLinks.push({
			name: t(`navbar-browse-links__${view}`),
			path: "/", // Este path no se usa por el e.preventDefault()
			icon:
				view === "lista"
					? icon_list
					: view === "tarjetas"
						? icon_card
						: icon_grid,
			action: "toggleView",
		});
	}

	// 2. Botón de filtros (siempre va)
	navBrowseLinks.push({
		name:
			t("navbar-browse-links__filtros") +
			(totalFilters > 0 ? ` (${totalFilters})` : ""),
		path: "/",
		icon: icon_filtros,
		action: "toggleSidebar",
	});

	return (
		<div className={`navbar${isNavVisible ? "" : "--hidden"}`}>
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
			{isHome && (
				<div className="navbar-browse">
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
				</div>
			)}
		</div>
	);
};

export default CoNav;
