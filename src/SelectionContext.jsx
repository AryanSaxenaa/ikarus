import React, { createContext, useContext, useState } from "react";
const SelectionContext = createContext();

export function SelectionProvider({ children }) {
  const [selected, setSelected] = useState(null);
  return <SelectionContext.Provider value={{ selected, setSelected }}>{children}</SelectionContext.Provider>;
}
export function useSelection() { return useContext(SelectionContext); }
