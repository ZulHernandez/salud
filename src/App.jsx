import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense } from "react";

import { useGlassFilter } from "./components/context/GlassFilterContext";
import { useUI } from "./components/context/UIContext";
import { useView } from "./components/context/ViewContext";

import CoNav from "./components/general/CoNav";
import CoFilterMenu from "./components/general/CoFilterMenu";
import CoFilters from "./components/general/CoFilters";
import CoIndex from "./components/general/CoIndex";
import CoErrorBoundary from "./components/general/CoErrorBoundary";
import { CatalogProvider } from "./components/context/CatalogProvider";
import RoHome from "./routes/RoHome";
import RoCarga from "./routes/RoCarga";

// App.jsx
function App() {
	const { allFilters } = useGlassFilter();
	const { viewport } = useUI();
	const { view } = useView();

	return (
		<Routes>
			<Route
				path="/"
				element={<Navigate to="/home/es/lista?color=granada" replace />}
			/>

			<Route
				path="/home/:lang/:view"
				element={
					<>
						<div className="halftone-overlay"></div>
						<CoNav />
						{/* El catálogo ahora se carga por fetch (ver drinksSource.js), así
						que todo lo que depende de él -incluyendo el sidebar de filtros,
						el índice y los filtros activos- tiene que esperar dentro del
						mismo error boundary. CoFilterMenu tiene su propio Suspense
						(fallback null: no hay nada sensato que mostrar ahí mientras
						carga) para no bloquear el contenido principal si por lo que sea
						resuelve distinto. */}
						<CoErrorBoundary>
							<Suspense fallback={null}>
								<CoFilterMenu />
							</Suspense>
							<Suspense fallback={<RoCarga />}>
								<CatalogProvider>
									{view !== "cuadricula" ? <CoIndex /> : null}
									{allFilters.length > 0 && !viewport.isMobile && (
										<CoFilters filtros={allFilters} />
									)}
									<RoHome />
								</CatalogProvider>
							</Suspense>
						</CoErrorBoundary>
					</>
				}
			/>

			<Route
				path="*"
				element={<Navigate to="/home/es/lista?color=granada" replace />}
			/>
		</Routes>
	);
}

export default App;
