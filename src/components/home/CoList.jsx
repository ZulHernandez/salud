import "../../styles/pages/home/list.scss";

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

const CoList = ({ drink }) => {
	return (
		<div className="list">
			<div className="list-viewer">
				<img src={drink.glass.glass.empty} alt={drink.name} />
				<div
					className="list-viewer-liquid"
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

			<div className="list-info">
				<h3>{drink.name}</h3>
				<div className="list-info-ingredients">
					{drink.ingredients.map((ingredient, index) => (
						<div key={index} className="list-info-ingredients-element">
							<div
								className="list-info-ingredients-element-color"
								style={{ backgroundColor: ingredient.alcohol.color }}
							></div>
							<div className="list-info-ingredients-element-text">
								<p className="list-info-ingredients-element-text-quantity">
									{ingredient.quantity} {drink.unity}
								</p>
								<p className="list-info-ingredients-element-text-name">
									{ingredient.alcohol.name}
								</p>
							</div>
						</div>
					))}
				</div>
				{drink.infoAli && (
					<div className="list-info-ali">
						{drink.infoAli.calories && (
							<span>
								{drink.infoAli.calories} <span>kcal</span>
							</span>
						)}
						{drink.infoAli.alcVol && (
							<span>
								{drink.infoAli.alcVol}% <span>alc./vol.</span>
							</span>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default CoList;
