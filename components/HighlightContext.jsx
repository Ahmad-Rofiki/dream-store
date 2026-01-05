"use client";
import { createContext, useContext, useState } from "react";

const HighlightContext = createContext();

export function HighlightProvider({ children }) {
  const [text, setText] = useState("Barang siap pakai");
  const [color, setColor] = useState("cyan");

  return (
    <HighlightContext.Provider value={{ text, setText, color, setColor }}>
      {children}
    </HighlightContext.Provider>
  );
}

export const useHighlight = () => useContext(HighlightContext);
