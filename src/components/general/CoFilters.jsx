import CoFilter from "./CoFilter";

import { useUI } from "../context/UIContext";

const CoFilters = ({ filtros }) => {
    const { isNavVisible } = useUI();
    
    return (
        <div className={isNavVisible ? "filters" : "filters--hidden"}>
            {filtros.map((filtro) => (
                <CoFilter 
                    key={filtro.text} // 'filtro' ahora es { text, type }
                    text={filtro.text} 
                    type={filtro.type} 
                />
            ))}
        </div>
    );
};

export default CoFilters;
