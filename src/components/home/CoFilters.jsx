import CoFilter from "../general/CoFilter";

const filtros = [
    "absinthe",
    "boston - pint",
    "collins",
    "copita - sherry",
    "coupe - coupette - champagne",
    "double old fashioned",
    "flute",
    "globet - wine",
    "highball - hi ball",
    "hurricane",
    "julep",
    "margarita",
    "martini",
    "mule",
    "nick & nora",
    "old fashioned",
    "poco grande - piña colada",
    "rocks",
    "shot",
    "sling",
    "snifer - brandy",
    "sour",
    "tea cup",
    "tiki",
    "toddy"
];

const CoFilters = () => {
	return (
		<div className="filters">
			{filtros.map((filtro) => (
				<CoFilter key={filtro} text={filtro} />
			))}
		</div>
	);
};

export default CoFilters;
