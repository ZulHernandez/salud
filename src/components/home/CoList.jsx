import "../../styles/pages/home/list.scss";

import CoViewer from "./CoViewer";

const CoList = ({ drink }) => {
	return (
		<div className="list">
			<CoViewer drink={drink} kind={"list"} />
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
