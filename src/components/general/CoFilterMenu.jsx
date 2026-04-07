import "../../styles/general/CoFilterMenu.scss";
import { useLanguage } from "../context/LanguageContext";

const CoFilterMenu = () => {
    const { t } = useLanguage();

    return (
        <div className="sidebar">
            <div className="sidebar-head">
                <h2>{t("sidebar-head__h2")}</h2>
            </div>
        </div>
    );
};

export default CoFilterMenu;
