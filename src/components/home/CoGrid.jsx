import { memo } from "react";

import "../../styles/pages/home/grid.scss";
import { useLanguage } from "../context/LanguageContext";

import CoViewer from "./CoViewer";

import chill from "../../assets/icons/chill.svg";

const CoGrid = memo(({ drink }) => {
	const { t } = useLanguage();

	return (
		<div className="grid" tabIndex={0}>
			<h3>{t(drink.name)}</h3>
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
									{ingredient.chill && <img style={{width: "1rem"}} src={chill} alt="chill icon" />}
									&nbsp;{t(ingredient.alcohol.name)}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
});

export default CoGrid;
