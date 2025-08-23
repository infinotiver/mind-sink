// src/context/AppStateContext.tsx
import React, { createContext, useContext, useState } from "react";
import { fetchData } from "../utils/apiHandler";

type AppState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  apiData: any;
  loadApiData: (endpoint: string) => Promise<void>;
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiData, setApiData] = useState(null);

  async function loadApiData(endpoint: string) {
    const data = await fetchData(endpoint);
    setApiData(data);
  }

  return (
    <AppStateContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, apiData, loadApiData }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("AppState used outside of provider");
  return context;
}
