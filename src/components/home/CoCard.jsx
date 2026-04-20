import "../../styles/pages/home/card.scss";
import { useLanguage } from "../context/LanguageContext";

import CoViewer from "./CoViewer";

import chill from "../../assets/icons/chill.svg";

const CoCard = ({ drink }) => {
	const { t, language } = useLanguage();

	return (
		<div className="card">
			<h3>{t(drink.name)}</h3>
			<CoViewer drink={drink} kind={"card"} />
			<div className="card-info">
				<div className="card-info-ingredients">
					{drink.ingredients.map((ingredient, index) => (
						<div key={index} className="card-info-ingredients-element">
							<div
								className="card-info-ingredients-element-color"
								style={{ backgroundColor: ingredient.alcohol.color }}
							></div>
							<div className="card-info-ingredients-element-text">
								<p className="card-info-ingredients-element-text-quantity">
									{ingredient.quantity} {drink.unity}
								</p>
								<p className="card-info-ingredients-element-text-name">
									{ingredient.chill && (
										<img
											style={{ width: "1rem" }}
											src={chill}
											alt="chill icon"
										/>
									)}
									&nbsp;{t(ingredient.alcohol.name)}
								</p>
							</div>
						</div>
					))}
				</div>
				{drink.infoAli && (
					<div className="card-info-ali">
						{drink.infoAli.calories && (
							<span>
								{drink.infoAli.calories} <span>kcal</span>
							</span>
						)}
						{drink.infoAli.alcVol && (
							<span>
								{language === "ja" ? (
									<>
										<span>アルコール分</span> {drink.infoAli.alcVol}%
									</>
								) : language === "ru" ? (
									<>
										{drink.infoAli.alcVol}% <span>алк./об.</span>
									</>
								) : (
									<>
										{drink.infoAli.alcVol}% <span>alc./vol.</span>
									</>
								)}
							</span>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default CoCard;
