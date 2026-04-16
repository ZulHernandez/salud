import "../../styles/pages/home/grid.scss";

import CoViewer from "./CoViewer";

const CoGrid = ({ drink }) => {
	return (
		<div className="grid">
			<h3>{drink.name}</h3>
			<CoViewer drink={drink} kind={"grid"}/>
			<div className="grid-info">
				<div className="grid-info-ingredients">
					{drink.ingredients.map((ingredient, index) => (
						<div key={index} className="grid-info-ingredients-element">
							<div
								className="grid-info-ingredients-element-color"
								style={{ backgroundColor: ingredient.alcohol.color }}
							></div>
							<div className="grid-info-ingredients-element-text">
								<span className="grid-info-ingredients-element-text-name">
									{ingredient.alcohol.name}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CoGrid;
