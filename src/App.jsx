import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense } from "react";

// Contextos
import { LanguageContextProvider } from "./components/context/LanguageContext";
import { ViewContextProvider } from "./components/context/ViewContext";
import { ThemeContextProvider } from "./components/context/ThemeContext";

import { useGlassFilter } from "./components/context/GlassFilterContext";
import { useUI } from "./components/context/UIContext";
import { useView } from "./components/context/ViewContext";

import CoNav from "./components/general/CoNav";
import CoFilterMenu from "./components/general/CoFilterMenu";
import CoFilters from "./components/general/CoFilters";
import CoIndex from "./components/general/CoIndex";
import RoHome from "./routes/RoHome";
import RoCarga from "./routes/RoCarga";

// App.jsx
function App() {
	const { allFilters} = useGlassFilter();
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
						<CoNav />
						<CoFilterMenu />
						{view !== "cuadricula" ? <CoIndex /> : null}
						{allFilters.length > 0 && !viewport.isMobile && (
							<CoFilters filtros={allFilters} />
						)}
						<Suspense fallback={<RoCarga />}>
							<RoHome />
						</Suspense>
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
