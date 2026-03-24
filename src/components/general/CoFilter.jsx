import close from "../../assets/icons/close--white.svg";
import "../../styles/general/CoFilter.scss";

import glasswareAssets from "../../utils/glassware"; // El objeto con los imports de SVGs
import { useLanguage } from "../context/LanguageContext";

const CoFilter = ({ text }) => {
    const { t } = useLanguage();

    // 1. Buscamos las imágenes usando el 'text' como llave técnica.
    // Usamos toLowerCase() solo si tus llaves en glassware.js están en minúsculas.
    const technicalKey = text?.toLowerCase();
    const iconEntry = glasswareAssets[technicalKey];

    const black = iconEntry?.fillBlack;
    const white = iconEntry?.fillWhite;

    return (
        <div className="filter-toogle--active">
            {!black || !white ? (
                <>
                    {/* Si no hay icono, traducimos el texto directamente */}
                    <span>{t(technicalKey)}</span>
                    <img className="filter-toogle-close" src={close} alt="close" />
                </>
            ) : (
                <>
                    <img className="filter-toogle-icon" src={black} alt={t(technicalKey)} />
                    <img className="filter-toogle-icon--white" src={white} alt={t(technicalKey)} />
                    {/* Traducimos el nombre de la copa */}
                    <span>{t(technicalKey)}</span> 
                    <img className="filter-toogle-close" src={close} alt="close" />
                </>
            )}
        </div>
    );
};

export default CoFilter;
