import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense } from "react";

// Contextos
import { LanguageContextProvider } from "./components/context/LanguageContext";
import { ViewContextProvider } from "./components/context/ViewContext";
import { ThemeContextProvider } from "./components/context/ThemeContext";

import CoNav from "./components/general/CoNav";
import CoFilterMenu from "./components/general/CoFilterMenu";
import RoHome from "./routes/RoHome";
import RoCarga from "./routes/RoCarga";

function App() {
	return (

		<LanguageContextProvider>
			<ViewContextProvider>
				<ThemeContextProvider>
					<Routes>
						<Route
							path="/"
							element={<Navigate to="/home/es/lista?color=FF3F3F" replace />}
						/>

						{/* Ruta dinámica con Idioma y Vista */}
						<Route
							path="/home/:lang/:view"
							element={
								<>
									{/* <CoFilterMenu/> */}
									<CoNav />
									<Suspense fallback={<RoCarga />}>
										<RoHome />
									</Suspense>
								</>
							}
						/>

						{/* Fallback para rutas no encontradas */}
						<Route
							path="*"
							element={<Navigate to="/home/es/lista?color=FF3F3F" replace />}
						/>
					</Routes>
				</ThemeContextProvider>
			</ViewContextProvider>
		</LanguageContextProvider>
	);
}

export default App;
