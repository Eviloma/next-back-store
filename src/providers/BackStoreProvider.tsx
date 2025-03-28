"use client";

import type { BackStore } from "@/store/back";
import useBack from "@/store/back";
import { type ReactNode, createContext } from "react";
import type { StoreApi } from "zustand";

const BackStoreContext = createContext<StoreApi<BackStore> | null>(null);

interface Iprops {
  children: ReactNode;
}

const BackStoreProvider = ({ children }: Iprops) => (
  <BackStoreContext.Provider value={useBack}>
    {children}
  </BackStoreContext.Provider>
);

export default BackStoreProvider;
