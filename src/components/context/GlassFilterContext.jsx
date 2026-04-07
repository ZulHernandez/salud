import { BitmaskService } from '../../utils/bitmask';
import { GLASS_CATALOG } from '../'; // Es mejor tener el array en constantes

// ... dentro del Provider ...
const activeFilters = useMemo(() => {
    const hex = searchParams.get('g');
    return BitmaskService.decode(hex, GLASS_CATALOG);
}, [searchParams]);

const toggleGlass = (name) => {
    const next = activeFilters.includes(name)
        ? activeFilters.filter(f => f !== name)
        : [...activeFilters, name];
    
    const hex = BitmaskService.encode(next, GLASS_CATALOG);
    
    const newParams = new URLSearchParams(searchParams);
    hex !== "0" ? newParams.set('g', hex) : newParams.delete('g');
    setSearchParams(newParams);
};