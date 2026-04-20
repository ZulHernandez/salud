import "../../styles/pages/home/list.scss";
import { useLanguage } from "../context/LanguageContext";

import CoViewer from "./CoViewer";

import chill from "../../assets/icons/chill.svg";

const CoList = ({ drink }) => {
	const { t, language } = useLanguage();

	return (
		<div className="list">
			<CoViewer drink={drink} kind={"list"} />
			<div className="list-info">
				<h3>{t(drink.name)}</h3>
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
									{ingredient.chill && <img style={{width: "1rem"}} src={chill} alt="chill icon" />}
									&nbsp;{t(ingredient.alcohol.name)}
								</p>
							</div>
						</div>
					))}
				</div>
				{drink.infoAli && (
					<div className="list-info-ali">
						{drink.infoAli.calories && (
							<span>
								{drink.infoAli.calories} <span>{t("list-info-ali--kcal")}</span>
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

export default CoList;
