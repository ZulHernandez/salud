// Loader auxiliar solo para scripts/build-drinks-data.mjs: Node no sabe
// importar archivos .svg/.png directamente (eso lo resuelve Vite dentro de
// la app real), ni resuelve imports relativos sin extensión (".../glassware"
// en vez de ".../glassware.js") como sí lo hace Vite. Acá no nos interesa el
// contenido de la imagen, solo poder cargar glassware.js/drinks.js tal cual
// están escritos para leer sus referencias.
export async function resolve(specifier, context, nextResolve) {
	if (/\.(svg|png|jpe?g|webp|gif)(\?.*)?$/.test(specifier)) {
		return { url: `asset:${encodeURIComponent(specifier)}`, shortCircuit: true };
	}
	try {
		return await nextResolve(specifier, context);
	} catch (err) {
		if (err?.code === "ERR_MODULE_NOT_FOUND" && /^\.\.?\//.test(specifier)) {
			return await nextResolve(`${specifier}.js`, context);
		}
		throw err;
	}
}

export async function load(url, context, nextLoad) {
	if (url.startsWith("asset:")) {
		const specifier = decodeURIComponent(url.slice("asset:".length));
		return {
			format: "module",
			source: `export default ${JSON.stringify(specifier)};`,
			shortCircuit: true,
		};
	}
	return nextLoad(url, context);
}
