import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/context/ScrollToTop";

import { GlassFilterProvider } from "./components/context/GlassFilterProvider.jsx";
import { UIContextProvider } from "./components/context/UIProvider.jsx";
import { LanguageContextProvider } from "./components/context/LanguageProvider.jsx";
import { ViewContextProvider } from "./components/context/ViewProvider.jsx";
import { ThemeContextProvider } from "./components/context/ThemeProvider.jsx";

import "./styles/index.scss";

import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
// main.jsx
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ScrollToTop />
            <LanguageContextProvider>
                <ViewContextProvider>
                    <ThemeContextProvider>
                        <GlassFilterProvider>
                            <UIContextProvider>
                                <App />
                            </UIContextProvider>
                        </GlassFilterProvider>
                    </ThemeContextProvider>
                </ViewContextProvider>
            </LanguageContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
