import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense } from "react";

// Contextos
import { LanguageContextProvider } from "./components/context/LanguageContext";
import { ViewContextProvider } from "./components/context/ViewContext";
import { ThemeContextProvider } from "./components/context/ThemeContext";

import CoNav from "./components/general/CoNav";
import RoHome from "./routes/RoHome";
import RoCarga from "./routes/RoCarga";

function App() {
	return (
		/* Colocamos los Providers aquí para que persistan mientras el usuario navega entre diferentes vistas.
        */
		<LanguageContextProvider>
			<ViewContextProvider>
				<ThemeContextProvider>
					<Routes>
						{/* Redirección inicial */}
						<Route
							path="/"
							element={<Navigate to="/home/es/lista" replace />}
						/>

						{/* Ruta dinámica con Idioma y Vista */}
						<Route
							path="/home/:lang/:view"
							element={
								<>
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
							element={<Navigate to="/home/es/lista" replace />}
						/>
					</Routes>
				</ThemeContextProvider>
			</ViewContextProvider>
		</LanguageContextProvider>
	);
}

export default App;
