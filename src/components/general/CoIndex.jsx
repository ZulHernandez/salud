import "../../styles/general/CoIndex.scss";

import { useUI } from "../context/UIContext";
import { useCatalog } from "../context/CatalogContext";

const CoIndex = () => {
	const { isNavVisible } = useUI();
	const { letters, scrollToLetter } = useCatalog();

	return (
		<div className={`index${!isNavVisible ? "--short" : ""}`}>
			{letters.map((letra) => (
				<a
					href={`#seccion-${letra.toLowerCase()}`}
					key={letra}
					onClick={(e) => {
						e.preventDefault();
						scrollToLetter(letra);
					}}
				>
					{letra.toLowerCase()}
				</a>
			))}
		</div>
	);
};

export default CoIndex;
