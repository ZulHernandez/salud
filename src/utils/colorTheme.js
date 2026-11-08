// Paleta ajustada para que se sienta impresa (CMYK), no de pantalla: menos
// saturación de la que un rojo/azul/etc. puro alcanza en RGB (una prensa
// real nunca llega a esa saturación), y un empujón cálido leve -el papel y
// la tinta real casi nunca dan un negro o un color neutro perfecto-.
// "complement" es el color complementario real (mismo tono/saturación,
// matiz +180°) de cada acento -calculado una sola vez con colorsys en
// Python, no a mano-. Se usa para el par de contraste tipo "etiqueta"
// (ver ThemeProvider, que lo expone como --color-complementario), la
// misma idea de los pósters/menús de referencia que usan dos tintas en
// vez de solo degradados de una.
const colores = [
	{ name: "granada", value: "#EB584F", complement: "#4FE2EB" }, // antes #FF3F3F
	{ name: "mandarina", value: "#EB874F", complement: "#4FB3EB" }, // antes #FF783F
	{ name: "mango", value: "#C29C16", complement: "#163CC2" }, // antes #D59900
	{ name: "manzana", value: "#4CAB13", complement: "#7213AB" }, // antes #51BA00
	{ name: "menta", value: "#13AC82", complement: "#AC133D" }, // antes #00BB7C
	{ name: "mora", value: "#149DB4", complement: "#B42B14" }, // antes #00B4C5
	{ name: "arandano", value: "#4F81EB", complement: "#EBB94F" }, // antes #3F88FF
	{ name: "zarzamora", value: "#774FEB", complement: "#C3EB4F" }, // antes #653FFF
	{ name: "uva", value: "#CE4FEB", complement: "#6CEB4F" }, // antes #CF3FFF
	{ name: "pitaya", value: "#EB4F84", complement: "#4FEBB6" }, // antes #FF3F8C
	// higo es gris neutro (saturación 0): no tiene complementario real -su
	// "complemento" es él mismo-, así que aquí se le da un acento cálido
	// fijo solo para que el par de contraste siga funcionando en ese tema.
	{ name: "higo", value: "#383838", complement: "#8A5A3D" }, // antes #333333
];

export default colores;
