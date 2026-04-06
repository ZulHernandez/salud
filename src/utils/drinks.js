import glassware from "./glassware";
import licours from "./licours";

const drinks = {
	"negroni": {
		name: "negroni",
		glass: {
			name: "old fashioned",
			glass: glassware["old fashioned"],
		},
		ingredients: [
			{ alcohol: licours["rosso vermouth"], quantity: 30 },
			{ alcohol: licours["campari"], quantity: 30 },
			{ alcohol: licours["gin"], quantity: 30 },
		],
		unity: "ml",
		infoAli: {
			calories: 183,
			alcVol: 21.57,
		},
	},
	"last word": {
		name: "last word",
		glass: {
			name: "coupe - coupette - champagne",
			glass: glassware["coupe - coupette - champagne"],
		},
		ingredients: [
			{ alcohol: licours["agua"], quantity: 10 },
			{ alcohol: licours["jugo de limón"], quantity: 20 },
			{ alcohol: licours["luxardo maraschino"], quantity: 20 },
			{ alcohol: licours["licór de hierbas"], quantity: 20 },
			{ alcohol: licours["gin"], quantity: 30 },
		],
		unity: "ml",
		infoAli: {
			calories: 185,
			alcVol: 21.88,
		},
	},
	"naked & famous": {
		name: "naked & famous",
		glass: {
			name: "coupe - coupette - champagne",
			glass: glassware["coupe - coupette - champagne"],
		},
		ingredients: [
			{ alcohol: licours["jugo de limón"], quantity: 22.5 },
			{ alcohol: licours["licór de génépi"], quantity: 22.5 },
			{ alcohol: licours["aperol"], quantity: 22.5 },
			{ alcohol: licours["mezcal"], quantity: 22.5 },
		],
		unity: "ml",
		infoAli: {
			calories: 179,
			alcVol: 17.65,
		},
	},
	"daiquiri": {
		name: "daiquiri",
		glass: {
			name: "coupe - coupette - champagne",
			glass: glassware["coupe - coupette - champagne"],
		},
		ingredients: [
			{ alcohol: licours["agua"], quantity: 7.5 },
			{ alcohol: licours["sirope de azucar"], quantity: 10 },
			{ alcohol: licours["jugo de limón"], quantity: 15 },
			{ alcohol: licours["ron blanco"], quantity: 50 },
		],
		unity: "ml",
		infoAli: {
			calories: 139,
			alcVol: 17.84,
		},
	},
	"penicillin": {
		name: "penicillin",
		glass: {
			name: "old fashioned",
			glass: glassware["old fashioned"],
		},
		ingredients: [
			{ alcohol: licours["sirope de miel"], quantity: 20 },
			{ alcohol: licours["jugo de limón"], quantity: 20 },
			{ alcohol: licours["single malt whisky"], quantity: 10 },
			{ alcohol: licours["licor de gengibre"], quantity: 15 },
			{ alcohol: licours["blended whisky"], quantity: 45 },
		],
		unity: "ml",
		infoAli: {
			calories: 220,
			alcVol: 17.91,
		},
	},
	"margarita en las rocas": {
		name: "margarita en las rocas",
		glass: {
			name: "rocks",
			glass: glassware["rocks"],
		},
		ingredients: [
			{ alcohol: licours["sirope de agave"], quantity: 5 },
			{ alcohol: licours["jugo de limón"], quantity: 22.5 },
			{ alcohol: licours["triple sec"], quantity: 22.5 },
			{ alcohol: licours["tequila"], quantity: 45 },
		],
		unity: "ml",
		infoAli: {
			calories: 167,
			alcVol: 20.9,
		},
	},
	"south side rickey": {
		name: "south side rickey",
		glass: {
			name: "collins",
			glass: glassware["collins"],
		},
		ingredients: [
			{ alcohol: licours["agua mineral"], quantity: 40 },
			{ alcohol: licours["sirope de azucar"], quantity: 22.5 },
			{ alcohol: licours["jugo de limón"], quantity: 30 },
			{ alcohol: licours["gin"], quantity: 60 },
		],
		unity: "ml",
		infoAli: null,
	},
	"mezcal margarita": {
		name: "mezcal margarita",
		glass: {
			name: "rocks",
			glass: glassware["rocks"],
		},
		ingredients: [
			{ alcohol: licours["sirope de agave"], quantity: 5 },
			{ alcohol: licours["jugo de limón"], quantity: 22.5 },
			{ alcohol: licours["triple sec"], quantity: 22.5 },
			{ alcohol: licours["mezcal"], quantity: 45 },
		],
		unity: "ml",
		infoAli: {
			calories: 163,
			alcVol: 21.59,
		},
	},
	"sabot": {
		name: "sabot",
		glass: {
			name: "coupe - coupette - champagne",
			glass: glassware["coupe - coupette - champagne"],
		},
		ingredients: [
			{ alcohol: licours["champagne"], quantity: 22.5 },
			{ alcohol: licours["clara de huevo"], quantity: 15 },
			{ alcohol: licours["sirope de azucar"], quantity: 10 },
			{ alcohol: licours["jugo de limón"], quantity: 22.5 },
			{ alcohol: licours["triple sec"], quantity: 22.5 },
			{ alcohol: licours["gin"], quantity: 45 },
		],
		unity: "ml",
		infoAli: {
			calories: 209,
			alcVol: 16.17,
		},
	},
	"left bank martini": {
		name: "left bank martini",
		glass: {
			name: "coupe - coupette - champagne",
			glass: glassware["coupe - coupette - champagne"],
		},
		ingredients: [
			{ alcohol: licours["vermouth"], quantity: 7.5 },
			{ alcohol: licours["vino blanco"], quantity: 15 },
			{ alcohol: licours["licor de flor de saucó"], quantity: 15 },
			{ alcohol: licours["gin"], quantity: 60 },
		],
		unity: "ml",
		infoAli: {
			calories: 190,
			alcVol: 24.93,
		},
	},
	"new york minute": {
		name: "new york minute",
		glass: {
			name: "coupe - coupette - champagne",
			glass: glassware["coupe - coupette - champagne"],
		},
		ingredients: [
			{ alcohol: licours["sirope de azucar"], quantity: 5 },
			{ alcohol: licours["luxardo maraschino"], quantity: 15 },
			{ alcohol: licours["carpano"], quantity: 20 },
			{ alcohol: licours["tequila"], quantity: 52.5 },
		],
		unity: "ml",
		infoAli: {
			calories: 201,
			alcVol: 24.74,
		},
	},
	"brooklyn": {
		name: "brooklyn",
		glass: {
			name: "coupe - coupette - champagne",
			glass: glassware["coupe - coupette - champagne"],
		},
		ingredients: [
			{ alcohol: licours["agua"], quantity: 10 },
			{ alcohol: licours["luxardo maraschino"], quantity: 10 },
			{ alcohol: licours["amer picon"], quantity: 10 },
			{ alcohol: licours["rosso vermouth"], quantity: 15 },
			{ alcohol: licours["whiskey"], quantity: 45 },
		],
		unity: "ml",
		infoAli: {
			calories: 199,
			alcVol: 24.71,
		},
	},
	"dam it jimmy": {
		name: "dam it jimmy",
		glass: {
			name: "martini",
			glass: glassware["martini"],
		},
		ingredients: [
			{ alcohol: licours["sirope de azucar"], quantity: 5 },
			{ alcohol: licours["vermouth"], quantity: 7.5 },
			{ alcohol: licours["fino sherry"], quantity: 7.5 },
			{ alcohol: licours["ron blanco"], quantity: 45 },
			{ alcohol: licours["sake"], quantity: 45 },
		],
		unity: "ml",
		infoAli: {
			calories: 175,
			alcVol: 19.81,
		},
	},
	"madurised old fashined godfather": {
		name: "madurised old fashined godfather",
		glass: {
			name: "old fashioned",
			glass: glassware["old fashioned"],
		},
		ingredients: [
			{ alcohol: licours["vino tinto"], quantity: 15 },
			{ alcohol: licours["amaretto"], quantity: 15 },
			{ alcohol: licours["blended whisky"], quantity: 15 },
			{ alcohol: licours["whiskey"], quantity: 15 },
			{ alcohol: licours["bourbon"], quantity: 15 },
		],
		unity: "ml",
		infoAli: {
			calories: 180,
			alcVol: 28.52,
		},
	},
	"the dante": {
		name: "the dante",
		glass: {
			name: "coupe - coupette - champagne",
			glass: glassware["coupe - coupette - champagne"],
		},
		ingredients: [
			{ alcohol: licours["jugo de limón"], quantity: 20 },
			{ alcohol: licours["sirope de azucar"], quantity: 10 },
			{ alcohol: licours["licór de kummel"], quantity: 10 },
			{ alcohol: licours["licór de hierbas"], quantity: 10 },
			{ alcohol: licours["tequila blanco"], quantity: 40 },
		],
		unity: "ml",
		infoAli: {
			calories: 186,
			alcVol: 20.67,
		},
	},
	"mezcal dante": {
		name: "mezcal dante",
		glass: {
			name: "coupe - coupette - champagne",
			glass: glassware["coupe - coupette - champagne"],
		},
		ingredients: [
			{ alcohol: licours["jugo de limón"], quantity: 20 },
			{ alcohol: licours["sirope de agave"], quantity: 10 },
			{ alcohol: licours["licór de kummel"], quantity: 7.5 },
			{ alcohol: licours["licór de hierbas"], quantity: 10 },
			{ alcohol: licours["tequila blanco"], quantity: 15 },
			{ alcohol: licours["mezcal"], quantity: 30 },
		],
		unity: "ml",
		infoAli: {
			calories: null,
			alcVol: 21.42,
		},
	},
	"martini de un trago": {
		name: "martini de un trago",
		glass: {
			name: "shot",
			glass: glassware["shot"],
		},
		ingredients: [
			{ alcohol: licours["fino sherry"], quantity: 5 },
			{ alcohol: licours["ambrato"], quantity: 15 },
			{ alcohol: licours["vodka"], quantity: 30 },
		],
		unity: "ml",
		infoAli: {
			calories: 91,
			alcVol: 24.34,
		},
	},
};

export default drinks;
