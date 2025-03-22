"use client"; // Ensures this runs on the client

import { IStoreDetails } from "@/types/store";
import React, { createContext, useContext } from "react";


interface StoreContextType {
  store: IStoreDetails | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children, store }: { children: React.ReactNode; store: IStoreDetails }) {
  return <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
