import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/context/ScrollToTop";

import { GlassFilterProvider } from "./components/context/GlassFilterContext.jsx";
import { UIContextProvider } from "./components/context/UIContext.jsx";
import { LanguageContextProvider } from "./components/context/LanguageContext.jsx";
import { ViewContextProvider } from "./components/context/ViewContext.jsx";
import { ThemeContextProvider } from "./components/context/ThemeContext.jsx";

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
