import close from "../../assets/icons/close--white.svg";
import "../../styles/general/CoFilter.scss";

import glassware from "../../utils/glassware";

const CoFilter = ({ text }) => {
	const iconEntry = glassware[text?.toLowerCase()];

	// 2. Extraemos black y white (serán undefined si iconEntry no existe)
	const black = iconEntry?.black;
	const white = iconEntry?.white;

	return (
		<div className="filter-toogle--active">
			{!black || !white ? (
				<>
					<span>{text}</span>
					<img className="filter-toogle-close" src={close} alt="close" />
				</>
			) : (
				<>
					<img className="filter-toogle-icon" src={black} alt="filtro" />
					<img className="filter-toogle-icon--white" src={white} alt="filtro" />
					<span>{text}</span>
					<img className="filter-toogle-close" src={close} alt="close" />
				</>
			)}
		</div>
	);
};

export default CoFilter;
