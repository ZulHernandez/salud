import "../../styles/general/CoNav.scss";

import icon_random from "../../assets/icons/random.svg";
import icon_indice from "../../assets/icons/indice.svg";
import icon_perso from "../../assets/icons/perso.svg";
import icon_buscar from "../../assets/icons/buscar.svg";
import icon_vista from "../../assets/icons/vista.svg";
import icon_filtros from "../../assets/icons/filtros.svg";
import icon_navegador from "../../assets/icons/navegador.svg";


const navHeadLinks = [
	{ name: "aleatorio", path: "/", icon: icon_random },
	{ name: "índice", path: "/", icon: icon_indice },
	{ name: "personalización", path: "/", icon: icon_perso },
];

const navBrowseLinks = [
	{ name: "vista", path: "/", icon: icon_vista },
	{ name: "filtros", path: "/", icon: icon_filtros },
	{ name: "", path: "/", icon: icon_navegador },
];

const CoNavLink = ({ name, path, icon }) => {
	return (
		<a href={path}>
			<div className="navbar-head-links-element">
				<span>{name}</span>
				{icon && <img src={icon} alt={name} />}
			</div>
		</a>
	);
};

const CoInput = ({ placeholder }) => {
    return (
        <div className="navbar-browse-input">
            <input type="text" placeholder={placeholder} />
            <img src={icon_buscar} alt="buscar" />
        </div>
    );
}

const CoNav = () => {
	return (
		<div className="navbar">
			<div className="navbar-head">
				<div className="navbar-head-logo">
					<h1>Salud!</h1>
					<h3>cocktails • drinks • mocktails</h3>
				</div>
				<div className="navbar-head-links">
					{navHeadLinks.map((link) => (
						<CoNavLink
							key={link.name}
							name={link.name}
							path={link.path}
							icon={link.icon}
						/>
					))}
				</div>
			</div>
            <div className="navbar-browse">
                <CoInput placeholder="buscar..."></CoInput>
                <div className="navbar-browse-links">
                    {navBrowseLinks.map((link) => (
                        <CoNavLink
                            key={link.name}
                            name={link.name}
                            path={link.path}
                            icon={link.icon}
                        />
                    ))}
                </div>
            </div>
		</div>
	);
};

export default CoNav;
