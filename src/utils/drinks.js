import glassware from "./glassware";

const alcohol = {
	gin: {
		name: "gin",
		color: "#c0c0c0",
	},
	campari: {
		name: "campari",
		color: "#ff0000",
	},
	"sweet vermouth": {
		name: "sweet vermouth",
		color: "#800000",
	},
};

const drinks = {
	negroni: {
		name: "negroni",
		glass: {
			name: "old fashioned",
			glass: glassware["old fashioned"].emptyBlack,
			volume: 0.3,
		},
		ingredients: [
			{ alcohol: alcohol["gin"], quantity: 30 },
			{ alcohol: alcohol["campari"], quantity: 30 },
			{ alcohol: alcohol["sweet vermouth"], quantity: 30 },
		],
        unity: "ml",
        infoAli:{
            calories: 183,
            alcVol: 21.57,
        }
	},
};

export default drinks;
