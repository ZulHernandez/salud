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

const CLAVE_CACHE = "salud:catalogo-cache:v1";

// Última copia buena del catálogo (las "recetas" livianas, sin hidratar),
// para poder seguir mostrando algo si el próximo fetch falla (sin
// internet, el CDN caído, etc.) en vez de solo un error. No es una fuente
// de verdad: si el fetch funciona, siempre se usa lo que llegue por red.
function leerCache() {
	try {
		const guardado = localStorage.getItem(CLAVE_CACHE);
		return guardado ? JSON.parse(guardado) : null;
	} catch {
		// Modo privado, cuota llena, localStorage deshabilitado, etc.
		return null;
	}
}

function guardarCache(recetas) {
	try {
		localStorage.setItem(CLAVE_CACHE, JSON.stringify(recetas));
	} catch {
		// Si no se puede guardar, simplemente no hay fallback la próxima vez.
	}
}

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
			.then((recetas) => {
				guardarCache(recetas);
				return recetas;
			})
			.catch((error) => {
				const recetasCacheadas = leerCache();
				if (!recetasCacheadas) throw error;
				return recetasCacheadas;
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
