import React, { useState, useEffect, Suspense } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { MyContext } from "./components/context/MyContext";
import { preloadable } from "./utils/preloadable";

import RoHome from "./routes/RoHome";
import RoCarga from "./routes/RoCarga";

import CoNav from "./components/general/CoNav";


function App() {
	const [ruta, setRuta] = useState("/");
	const [language, setLanguage] = useState("EN");

	return (
		<MyContext.Provider value={{ ruta, setRuta, language, setLanguage }}>
            <CoNav />
            <Suspense fallback={<RoCarga />}>
                <Routes>
                    <Route path="/" element={<RoHome />} />x
                </Routes>
            </Suspense>
        </MyContext.Provider>
    );
}

export default App;
