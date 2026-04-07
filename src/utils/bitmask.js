/**
 * Servicio genérico para manejar bitmasks en URLs.
 */
export const BitmaskService = {
    // Convierte array de seleccionados a Hexadecimal basándose en un catálogo
    encode: (seleccionados, catalogo) => {
        if (!seleccionados || seleccionados.length === 0) return "0";
        
        let mask = 0n;
        catalogo.forEach((item, index) => {
            if (seleccionados.includes(item)) {
                mask |= (1n << BigInt(index));
            }
        });
        return mask.toString(16);
    },

    // Convierte Hexadecimal a array de strings basándose en un catálogo
    decode: (hex, catalogo) => {
        if (!hex || hex === "0") return [];
        try {
            const mask = BigInt(`0x${hex}`);
            return catalogo.filter((_, index) => {
                return (mask & (1n << BigInt(index))) !== 0n;
            });
        } catch (e) {
            console.error("Error decodificando bitmask:", e);
            return [];
        }
    }
};