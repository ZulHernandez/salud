import { useView } from "../components/context/ViewContext";

import "../styles/general/route.scss";
import "../styles/pages/home.scss";

import drinks from "../utils/drinks";

import CoFilters from "../components/home/CoFilters";
import CoList from "../components/home/CoList";
import CoCard from "../components/home/CoCard";

const filtros = [
	"absinthe",
	"boston - pint",
	"collins",
	"copita - sherry",
	"coupe - coupette - champagne",
	"double old fashioned",
	"flute",
	"globet - wine",
	"highball - hi ball",
	"hurricane",
	"julep",
	"margarita",
	"martini",
	"mule",
	"nick & nora",
	"old fashioned",
	"poco grande - piña colada",
	"rocks",
	"shot",
	"sling",
	"snifer - brandy",
	"sour",
	"tea cup",
	"tiki",
	"toddy",
];

const sortObjectByKey = (obj) => {
	return Object.keys(obj)
		.sort() // Ordena las llaves alfabéticamente (A-Z)
		.reduce((acc, key) => {
			acc[key] = obj[key];
			return acc;
		}, {});
};

const groupDrinksByLetter = (obj) => {
	// 1. Obtenemos las llaves y las ordenamos alfabéticamente primero
	const sortedKeys = Object.keys(obj).sort();

	// 2. Agrupamos usando reduce
	return sortedKeys.reduce((acc, key) => {
		// Tomamos la primera letra en mayúscula
		const firstLetter = key.charAt(0).toUpperCase();

		// Si la letra no existe en nuestro acumulador, la creamos como un objeto vacío
		if (!acc[firstLetter]) {
			acc[firstLetter] = {};
		}

		// Metemos el trago dentro de su letra correspondiente
		acc[firstLetter][key] = obj[key];

		return acc;
	}, {});
};

// Uso con tu objeto:
const ordDrinks = sortObjectByKey(drinks);
const groupDrinks = groupDrinksByLetter(ordDrinks);

const infoFinal = groupDrinks;

const RoHome = () => {
	const { view } = useView();

	return (
		<div className="main">
			{filtros.length === 0 ? <></> : <CoFilters filtros={filtros} />}
			{Object.keys(infoFinal).map((letter) => (
				<div key={letter}>
					<h1>{letter}</h1>
					{view === "tarjetas" ? (
						<div className="cards-container">
							{Object.keys(infoFinal[letter]).map((key, index) => (
								<CoCard key={index} drink={infoFinal[letter][key]} />
							))}
						</div>
					) : (
						Object.keys(infoFinal[letter]).map((key, index) => (
							<CoList key={index} drink={infoFinal[letter][key]} />
						))
					)}
				</div>
			))}
		</div>
	);
};

export default RoHome;
