import glassware from "./glassware";
import licours from "./licours";

let vaso = ["double old fashioned",
	"coupe - coupette - champagne",
	"coupe - coupette - champagne",
	"coupe - coupette - champagne",
	"old fashioned",
	"rocks",
	"collins",
	"rocks",
	"coupe - coupette - champagne",
	"coupe - coupette - champagne",
	"coupe - coupette - champagne",
	"coupe - coupette - champagne",
	"martini",
	"old fashioned",
	"coupe - coupette - champagne",
	"coupe - coupette - champagne",
	"coupe - coupette - champagne",
];

const drinks = {
	"negroni": {
		name: "negroni",
		glass: {
			name: vaso[0],
			glass: glassware[vaso[0]],
		},
		ingredients: [
			{ alcohol: licours["rosso vermouth"], quantity: 30 },
			{ alcohol: licours["campari"], quantity: 30 },
			{ alcohol: licours["gin"], quantity: 30 },
		],
		ganish: [
			glassware[vaso[0]].ganish.orange,
			glassware[vaso[0]].ganish.ice_cube,
		],
		unity: "ml",
		infoAli: {
			calories: 183,
			alcVol: 21.57,
		},
		mix_color: "#D55633",
	},
	"last word": {
		name: "last word",
		glass: {
			name: vaso[1],
			glass: glassware[vaso[1]],
		},
		ingredients: [
			{ alcohol: licours["agua"], quantity: 10, chill: true },
			{ alcohol: licours["jugo de limon"], quantity: 20 },
			{ alcohol: licours["luxardo maraschino"], quantity: 20 },
			{ alcohol: licours["licor de hierbas"], quantity: 20 },
			{ alcohol: licours["gin"], quantity: 30 },
		],
		ganish: [
			glassware[vaso[1]].ganish.cherries,
		],
		unity: "ml",
		infoAli: {
			calories: 185,
			alcVol: 21.88,
		},
		mix_color: "#D1CAAA",
	},
	"naked & famous": {
		name: "naked & famous",
		glass: {
			name: vaso[2],
			glass: glassware[vaso[2]],
		},
		ingredients: [
			{ alcohol: licours["jugo de limon"], quantity: 22.5 },
			{ alcohol: licours["licor de genepi"], quantity: 22.5 },
			{ alcohol: licours["aperol"], quantity: 22.5 },
			{ alcohol: licours["mezcal"], quantity: 22.5 },
		],
		ganish: [
			glassware[vaso[2]].ganish.lemon,
		],
		unity: "ml",
		infoAli: {
			calories: 179,
			alcVol: 17.65,
		},
		mix_color: "#FE4D02",
	},
	"daiquiri": {
		name: "daiquiri",
		glass: {
			name: vaso[3],
			glass: glassware[vaso[3]],
		},
		ingredients: [
			{ alcohol: licours["agua"], quantity: 7.5, chill: true },
			{ alcohol: licours["sirope de azucar"], quantity: 10 },
			{ alcohol: licours["jugo de limon"], quantity: 15 },
			{ alcohol: licours["ron blanco"], quantity: 50 },
		],
		ganish: [
			glassware[vaso[3]].ganish.lemon,
		],
		unity: "ml",
		infoAli: {
			calories: 139,
			alcVol: 17.84,
		},
		mix_color: "#E2DDD2",
	},
	"penicillin": {
		name: "penicillin",
		glass: {
			name: vaso[4],
			glass: glassware[vaso[4]],
		},
		ingredients: [
			{ alcohol: licours["sirope de miel"], quantity: 20 },
			{ alcohol: licours["jugo de limon"], quantity: 20 },
			{ alcohol: licours["single malt whisky"], quantity: 10 },
			{ alcohol: licours["licor de gengibre"], quantity: 15 },
			{ alcohol: licours["blended whisky"], quantity: 45 },
		],
		ganish: [
			glassware[vaso[4]].ganish.ice_cube,
			glassware[vaso[4]].ganish.ginger,
		],
		unity: "ml",
		infoAli: {
			calories: 220,
			alcVol: 17.91,
		},
		mix_color: "#B6A269",
	},
	"margarita en las rocas": {
		name: "margarita en las rocas",
		glass: {
			name: vaso[5],
			glass: glassware[vaso[5]],
		},
		ingredients: [
			{ alcohol: licours["sirope de agave"], quantity: 5 },
			{ alcohol: licours["jugo de limon"], quantity: 22.5 },
			{ alcohol: licours["triple sec"], quantity: 22.5 },
			{ alcohol: licours["tequila"], quantity: 45 },
		],
		ganish: [
			glassware[vaso[5]].ganish.ice_cube,
			glassware[vaso[5]].ganish.lemon,
		],
		unity: "ml",
		infoAli: {
			calories: 167,
			alcVol: 20.9,
		},
		mix_color: "#C8C0AA",
	},
	"south side rickey": {
		name: "south side rickey",
		glass: {
			name: vaso[6],
			glass: glassware[vaso[6]],
		},
		ingredients: [
			{ alcohol: licours["agua mineral"], quantity: 40 },
			{ alcohol: licours["sirope de azucar"], quantity: 22.5 },
			{ alcohol: licours["jugo de limon"], quantity: 30 },
			{ alcohol: licours["gin"], quantity: 60 },
		],
		ganish: [
			glassware[vaso[6]].ganish.ice_cube,
			glassware[vaso[6]].ganish.lemon,
			glassware[vaso[6]].ganish.mint,
		],
		unity: "ml",
		infoAli: null,
		mix_color: "#E8E2C3",
	},
	"mezcal margarita": {
		name: "mezcal margarita",
		glass: {
			name: vaso[7],
			glass: glassware[vaso[7]],
		},
		ingredients: [
			{ alcohol: licours["sirope de agave"], quantity: 5 },
			{ alcohol: licours["jugo de limon"], quantity: 22.5 },
			{ alcohol: licours["triple sec"], quantity: 22.5 },
			{ alcohol: licours["mezcal"], quantity: 45 },
		],
		ganish: [
			glassware[vaso[7]].ganish.lemon,
			glassware[vaso[7]].ganish.ice_cube,
		],
		unity: "ml",
		infoAli: {
			calories: 163,
			alcVol: 21.59,
		},
		mix_color: "#DDDCC8",
	},
	"sabot": {
		name: "sabot",
		glass: {
			name: vaso[8],
			glass: glassware[vaso[8]],
		},
		ingredients: [
			{ alcohol: licours["champagne"], quantity: 22.5 },
			{ alcohol: licours["clara de huevo"], quantity: 15 },
			{ alcohol: licours["sirope de azucar"], quantity: 10 },
			{ alcohol: licours["jugo de limon"], quantity: 22.5 },
			{ alcohol: licours["triple sec"], quantity: 22.5 },
			{ alcohol: licours["gin"], quantity: 45 },
		],
		ganish: [
			glassware[vaso[8]].ganish.lemon,
		],
		unity: "ml",
		infoAli: {
			calories: 209,
			alcVol: 16.17,
		},
		mix_color: "#CFC9B9",
	},
	"left bank martini": {
		name: "left bank martini",
		glass: {
			name: vaso[9],
			glass: glassware[vaso[9]],
		},
		ingredients: [
			{ alcohol: licours["vermouth"], quantity: 7.5 },
			{ alcohol: licours["vino blanco"], quantity: 15 },
			{ alcohol: licours["licor de flor de sauco"], quantity: 15 },
			{ alcohol: licours["gin"], quantity: 60 },
		],
		ganish: [
			glassware[vaso[9]].ganish.lemon,
		],
		unity: "ml",
		infoAli: {
			calories: 190,
			alcVol: 24.93,
		},
		mix_color: "#D5CAB8",
	},
	"new york minute": {
		name: "new york minute",
		glass: {
			name: vaso[10],
			glass: glassware[vaso[10]],
		},
		ingredients: [
			{ alcohol: licours["sirope de azucar"], quantity: 5 },
			{ alcohol: licours["luxardo maraschino"], quantity: 15 },
			{ alcohol: licours["carpano"], quantity: 20 },
			{ alcohol: licours["tequila"], quantity: 52.5 },
		],
		ganish: [
			glassware[vaso[10]].ganish.coffe_beans,
		],
		unity: "ml",
		infoAli: {
			calories: 201,
			alcVol: 24.74,
		},
		mix_color: "#C73A02",
	},
	"brooklyn": {
		name: "brooklyn",
		glass: {
			name: vaso[11],
			glass: glassware[vaso[11]],
		},
		ingredients: [
			{ alcohol: licours["agua"], quantity: 10, chill: true },
			{ alcohol: licours["luxardo maraschino"], quantity: 10 },
			{ alcohol: licours["amer picon"], quantity: 10 },
			{ alcohol: licours["rosso vermouth"], quantity: 15 },
			{ alcohol: licours["vermouth seco"], quantity: 15 },
			{ alcohol: licours["whiskey"], quantity: 45 },
		],
		ganish: [
			glassware[vaso[11]].ganish.cherries,
		],
		unity: "ml",
		infoAli: {
			calories: 199,
			alcVol: 24.71,
		},
		mix_color: "#890B08",
	},
	"dam it jimmy": {
		name: "dam it jimmy",
		glass: {
			name: vaso[12],
			glass: glassware[vaso[12]],
		},
		ingredients: [
			{ alcohol: licours["sirope de azucar"], quantity: 5 },
			{ alcohol: licours["vermouth"], quantity: 7.5 },
			{ alcohol: licours["fino sherry"], quantity: 7.5 },
			{ alcohol: licours["ron blanco"], quantity: 45 },
			{ alcohol: licours["sake"], quantity: 45 },
		],
		ganish: [
			glassware[vaso[12]].ganish.olives_chesse,
		],
		unity: "ml",
		infoAli: {
			calories: 175,
			alcVol: 19.81,
		},
		mix_color: "#D1C4A6",
	},
	"maduraised old fashioned godfather": {
		name: "maduraised old fashioned godfather",
		glass: {
			name: vaso[13],
			glass: glassware[vaso[13]],
		},
		ingredients: [
			{ alcohol: licours["vino tinto"], quantity: 15 },
			{ alcohol: licours["amaretto"], quantity: 15 },
			{ alcohol: licours["blended whisky"], quantity: 15 },
			{ alcohol: licours["whiskey"], quantity: 15 },
			{ alcohol: licours["bourbon"], quantity: 15 },
		],
		ganish: [
			glassware[vaso[13]].ganish.almond,
			glassware[vaso[13]].ganish.ice_cube,
		],
		unity: "ml",
		infoAli: {
			calories: 180,
			alcVol: 28.52,
		},
		mix_color: "#CB7802",
	},
	"the dante": {
		name: "the dante",
		glass: {
			name: vaso[14],
			glass: glassware[vaso[14]],
		},
		ingredients: [
			{ alcohol: licours["jugo de limon"], quantity: 20 },
			{ alcohol: licours["sirope de azucar"], quantity: 10 },
			{ alcohol: licours["licor de kummel"], quantity: 10 },
			{ alcohol: licours["licor de hierbas"], quantity: 10 },
			{ alcohol: licours["tequila blanco"], quantity: 40 },
		],
		ganish: [
			glassware[vaso[14]].ganish.basil,
		],
		unity: "ml",
		infoAli: {
			calories: 186,
			alcVol: 20.67,
		},
		mix_color: "#AAAA81",
	},
	"mezcal dante": {
		name: "mezcal dante",
		glass: {
			name: vaso[15],
			glass: glassware[vaso[15]],
		},
		ingredients: [
			{ alcohol: licours["jugo de limon"], quantity: 20 },
			{ alcohol: licours["sirope de agave"], quantity: 10 },
			{ alcohol: licours["licor de kummel"], quantity: 7.5 },
			{ alcohol: licours["licor de hierbas"], quantity: 10 },
			{ alcohol: licours["tequila blanco"], quantity: 15 },
			{ alcohol: licours["mezcal"], quantity: 30 },
		],
		ganish: [
			glassware[vaso[15]].ganish.basil,
		],
		unity: "ml",
		infoAli: {
			calories: null,
			alcVol: 21.42,
		},
		mix_color: "#C3BD8C",
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
		ganish: [
			glassware["shot"].ganish.olives_chesse,
		],
		unity: "ml",
		infoAli: {
			calories: 91,
			alcVol: 24.34,
		},
		mix_color: "#BFB9BF",
	},
	"daiquiri No.1": {
		name: "daiquiri No.1",
		glass: {
			name: vaso[3],
			glass: glassware[vaso[3]],
		},
		ingredients: [
			{ alcohol: licours["sirope de azucar"], quantity: 10 },
			{ alcohol: licours["jugo de limon"], quantity: 20 },
			{ alcohol: licours["ron añejo"], quantity: 50 },
		],
		ganish: [
			glassware[vaso[3]].ganish.lemon,
		],
		unity: "ml",
		infoAli: {
			calories: 139,
			alcVol: 17.84,
		},
		mix_color: "#E9E0C3",
	},
};

export default drinks;
