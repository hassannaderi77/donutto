"use client";
import { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [buy, setBuy] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <StoreContext.Provider value={{isAuth , setIsAuth , count, setCount, buy, setBuy }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
