import glassware from "./glassware";
import licours from "./licours";
import { hydrateDrinks } from "./hydrateDrinks";

// De dónde sale el catálogo:
// - en dev, del JSON local en public/data/ (el mismo que genera
//   scripts/build-drinks-data.mjs), para no depender de internet mientras
//   se desarrolla.
// - en producción, del repo "salud-data" servido gratis por jsDelivr (CDN
//   sobre GitHub), para que el catálogo no viaje empaquetado dentro del JS
//   de la app y se pueda actualizar sin volver a desplegar el sitio.
// VITE_DRINKS_DATA_URL permite pisar cualquiera de las dos (por ejemplo
// para apuntar a un tag fijo de salud-data en vez de "main", y controlar
// así cuándo jsDelivr debe servir la versión nueva).
const URL_CATALOGO =
	import.meta.env.VITE_DRINKS_DATA_URL ||
	(import.meta.env.DEV
		? "/data/drinks.json"
		: "https://cdn.jsdelivr.net/gh/ZulHernandez/salud-data@main/drinks.json");

// Promesa única y compartida entre toda la app: el fetch se dispara una
// sola vez por sesión, sin importar cuántos componentes usen `use()` sobre
// ella (CatalogProvider, y a través suyo, useFilteredDrinks).
let promesaCatalogo;

export function getCatalogoPromise() {
	if (!promesaCatalogo) {
		promesaCatalogo = fetch(URL_CATALOGO)
			.then((res) => {
				if (!res.ok) {
					throw new Error(`No se pudo cargar el catálogo (HTTP ${res.status})`);
				}
				return res.json();
			})
			.then((recetas) => hydrateDrinks(recetas, { glassware, licours }));
	}
	return promesaCatalogo;
}

// Para reintentar después de un fetch fallido (ver CoErrorBoundary): sin
// esto, `use()` seguiría lanzando para siempre la misma promesa ya
// rechazada en vez de intentar de nuevo.
export function resetCatalogoPromise() {
	promesaCatalogo = undefined;
}

export default getCatalogoPromise;
