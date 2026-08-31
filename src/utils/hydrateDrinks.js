// Reconstruye, a partir de las "recetas" livianas que llegan por fetch, el
// mismo objeto enriquecido (con los objetos reales de glassware/licours,
// que sí se quedan empaquetados en el JS de la app porque son un set fijo
// de vasos/licores que no crece con el catálogo) que el resto de la app ya
// esperaba antes. Así CoCard/CoGrid/CoList/CoViewer/useFilteredDrinks no
// necesitan enterarse de que el dato ahora llega por red.
export function hydrateDrinks(recetas, { glassware, licours }) {
	const hidratado = {};

	for (const [clave, receta] of Object.entries(recetas)) {
		const vaso = glassware[receta.glass];

		hidratado[clave] = {
			name: clave,
			glass: {
				name: receta.glass,
				glass: vaso,
			},
			ingredients: receta.ingredients.map((ingrediente) => {
				const salida = {
					alcohol: licours[ingrediente.alcohol],
					quantity: ingrediente.quantity,
				};
				if (ingrediente.chill) salida.chill = true;
				return salida;
			}),
			ganish: receta.ganish.map((nombre) => vaso.ganish[nombre]),
			unity: receta.unity,
			infoAli: receta.infoAli,
			mix_color: receta.mix_color,
		};
	}

	return hidratado;
}

export default hydrateDrinks;
