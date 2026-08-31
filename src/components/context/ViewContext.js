import { createContext, useContext } from "react";

export const ViewContext = createContext();

export const useView = () => useContext(ViewContext);
