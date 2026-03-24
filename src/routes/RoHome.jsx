import "../styles/general/route.scss";
import "../styles/pages/home.scss";

import CoFilters from "../components/home/CoFilters";
import CoCard from "../components/home/CoCard";

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

/* const filtros = [
]; */

const RoHome = () => {
    return (
        <div className="main">
            {filtros.length === 0 ? <></> : <CoFilters filtros={filtros} />}
            <h1>
                A
            </h1>
            <CoCard />
        </div>
    );
}

export default RoHome;