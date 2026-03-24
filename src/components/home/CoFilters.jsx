import CoFilter from "../general/CoFilter";

const CoFilters = ({ filtros }) => {
	return (
		<div className="filters">
			{filtros.map((filtro) => (
				<CoFilter key={filtro} text={filtro} />
			))}
		</div>
	);
};

export default CoFilters;
