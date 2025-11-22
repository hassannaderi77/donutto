"use client";

import { StoreProvider } from "@/context/StoreContext";

export default function StoreWrapper({ children }) {
  return <StoreProvider>{children}</StoreProvider>;
}