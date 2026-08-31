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
						<CoFilterMenu />
						{/* El catálogo ahora se carga por fetch (ver drinksSource.js), así
						que todo lo que depende de él -incluyendo el índice y los filtros-
						tiene que esperar dentro del mismo Suspense. */}
						<CoErrorBoundary>
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
