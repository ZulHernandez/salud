import "../../styles/pages/home/card.scss";
import drinks from "../../utils/drinks";

console.log(drinks);

const CoCard = () => {
	return (
		<div className="card">
			<div className="card-viewer">
				<img src={drinks["negroni"].glass.glass} alt={drinks["negroni"].name} />
				<div className="card-viewer-liquid">
					<div style={{ backgroundColor: "blue", height: "12.6%", width: "100%" }}></div>
					<div style={{ backgroundColor: "black", height: "18.1%", width: "100%" }}></div>
					<div style={{ backgroundColor: "red", height: "69.3%", width: "100%" }}></div>
				</div>
			</div>

			<div className="card-info">
				<h3>{drinks["negroni"].name}</h3>
				<div className="card-info-ingredients">
					{drinks["negroni"].ingredients.map((ingredient, index) => (
						<div key={index} className="card-info-ingredients-element">
							<div
								className="card-info-ingredients-element-color"
								style={{ backgroundColor: ingredient.alcohol.color }}
							></div>
							<div className="card-info-ingredients-element-text">
								<p className="card-info-ingredients-element-text-quantity">
									{ingredient.quantity} {drinks["negroni"].unity}
								</p>
								<p className="card-info-ingredients-element-text-name">
									{ingredient.alcohol.name}
								</p>
							</div>
						</div>
					))}
				</div>
				<div className="card-info-ali">
					<span>
						{drinks["negroni"].infoAli.calories} <span>kcal</span>
					</span>
					<span>
						{drinks["negroni"].infoAli.alcVol}% <span>alc./vol.</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export default CoCard;
