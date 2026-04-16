const GEOMETRIA_MARGARITA = {
	// Dónde cambia de forma la copa (del 0 al 1)
	puntoTransicionAltura: 0.4, // El bulbo inferior es el 40% de la altura total

	// Qué parte del volumen total cabe en el bulbo inferior (del 0 al 1)
	proporcionVolumenBase: 0.3, // El 30% de los ml totales llenan la base
};

function calcularAlturaMargarita(volumenAcumuladoProporcion) {
	const { puntoTransicionAltura, proporcionVolumenBase } = GEOMETRIA_MARGARITA;

	// ZONA 1: El volumen acumulado está dentro del bulbo base
	if (volumenAcumuladoProporcion <= proporcionVolumenBase) {
		// Usamos lógica cónica (raíz cúbica) escalada a la zona base
		const proporcionDentroDeBase =
			volumenAcumuladoProporcion / proporcionVolumenBase;
		return Math.pow(proporcionDentroDeBase, 1 / 3) * puntoTransicionAltura;
	}

	// ZONA 2: El volumen acumulado supera la base e invade el plato superior
	else {
		// Calculamos cuánto volumen "extra" hay en la zona superior
		const volumenSuperiorProporcion = 1 - proporcionVolumenBase;
		const volumenExtraEnSuperior =
			volumenAcumuladoProporcion - proporcionVolumenBase;

		// Usamos lógica lineal (cilíndrica) escalada a la zona superior
		const proporcionDentroDeSuperior =
			volumenExtraEnSuperior / volumenSuperiorProporcion;
		const alturaRestante = 1 - puntoTransicionAltura;

		return puntoTransicionAltura + proporcionDentroDeSuperior * alturaRestante;
	}
}

const CoViewer = ({ drink, kind }) => {
    return (
        <div className={`${kind}-viewer`}>
				<div style={{ height: "0px" }}>
					<div
						className={`${kind}-viewer-liquid`}
						style={{
							clipPath: `path("${drink.glass.glass.liquid.path}")`,
							width: drink.glass.glass.liquid.width,
							height: drink.glass.glass.liquid.height,
							marginTop: drink.glass.glass.liquid.marginTop,
							marginLeft: drink.glass.glass.liquid.marginLeft || "0px",
						}}
					>
						{(() => {
							let totalQuantity;
							switch (drink.glass.name) {
								case "martini": {
									const ingredients = drink.ingredients;
									totalQuantity = ingredients.reduce(
										(acc, ing) => acc + ing.quantity,
										0,
									);
									const reversedIngredients = [...ingredients].reverse();
									let cumulativeVolume = 0;
									let previousHeightPos = 0;
									const calculatedLayers = reversedIngredients.map(
										(ingredient) => {
											cumulativeVolume += ingredient.quantity;
											const currentHeightPos = Math.pow(
												cumulativeVolume / totalQuantity,
												1 / 3,
											);
											const visualHeightPercentage =
												(currentHeightPos - previousHeightPos) * 100;
											previousHeightPos = currentHeightPos;
											return {
												...ingredient,
												visualHeight: visualHeightPercentage,
											};
										},
									);
									return calculatedLayers.reverse().map((ingredient, index) => (
										<div
											key={index}
											style={{
												backgroundColor: ingredient.alcohol.color,
												height: `${ingredient.visualHeight}%`,
												width: "100%",
											}}
										></div>
									));
								}
								case "margarita": {
									const ingredients = drink.ingredients; // Viene de arriba a abajo
									const totalQuantity = ingredients.reduce(
										(acc, ing) => acc + ing.quantity,
										0,
									);

									// 1. Invertimos para calcular desde el fondo (punto 0 de volumen)
									const reversedIngredients = [...ingredients].reverse();

									let cumulativeVolume = 0;
									let previousHeightPos = 0; // Punto de altura (0 a 1)

									// 2. Calculamos los grosores visuales usando la geometría híbrida
									const calculatedLayers = reversedIngredients.map(
										(ingredient) => {
											cumulativeVolume += ingredient.quantity;
											const volAcumuladoProporcion =
												cumulativeVolume / totalQuantity;

											// LLAMADA A LA FUNCIÓN GEOMÉTRICA COMPLEJA
											const currentHeightPos = calcularAlturaMargarita(
												volAcumuladoProporcion,
											);

											const visualHeightPercentage =
												(currentHeightPos - previousHeightPos) * 100;

											previousHeightPos = currentHeightPos;

											return {
												...ingredient,
												visualHeight: visualHeightPercentage,
											};
										},
									);

									// 3. Revertimos al orden original para el render
									return calculatedLayers.reverse().map((ingredient, index) => (
										<div
											key={index}
											style={{
												backgroundColor: ingredient.alcohol.color,
												height: `${ingredient.visualHeight}%`,
												width: "100%",
											}}
										></div>
									));
								}
								default:
									totalQuantity = drink.ingredients.reduce(
										(acc, ingredient) => acc + ingredient.quantity,
										0,
									);
									return drink.ingredients.map((ingredient, index) => (
										<div
											key={index}
											style={{
												backgroundColor: ingredient.alcohol.color,
												height: `${(ingredient.quantity / totalQuantity) * 100}%`,
												width: "100%",
											}}
										></div>
									));
							}
						})()}
					</div>
				</div>
				{drink.ganish.map((ganish, index) => (
					<div key={index}  style={{ height: "0px" }}>
						<div className="card-viewer-ganish">
							<img
								style={{
									width: ganish.size,
									top: ganish.top,
									left: ganish.left,
									rotate: ganish.rotate,
								}}
								src={ganish.icon}
							/>
						</div>
					</div>
				))}
				<img src={drink.glass.glass.empty} alt={drink.name} />
			</div>
    );
}

export default CoViewer;