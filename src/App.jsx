import React, { useState, useEffect, Suspense } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { preloadable } from "./utils/preloadable";
import { LanguageProvider } from "./components/context/LanguageContext";

import RoHome from "./routes/RoHome";
import RoCarga from "./routes/RoCarga";

import CoNav from "./components/general/CoNav";


function App() {
	return (
		<LanguageProvider>
            <CoNav />
            <Suspense fallback={<RoCarga />}>
                <Routes>
                    <Route path="/" element={<RoHome />} />x
                </Routes>
            </Suspense>
        </LanguageProvider>
    );
}

export default App;
