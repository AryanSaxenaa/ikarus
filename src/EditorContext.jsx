import React, { createContext, useContext, useReducer, useMemo } from "react";

export const DEFAULT_CONFIG = {
  layout: "layoutA",
  typography: { family: "Inter, system-ui, sans-serif", weight: 500, size: 16 },
  button: { radius: 8, shadow: "small", align: "center", bg: "#2563eb", color: "#ffffff" },
  gallery: { align: "bottom", gap: 12, imgRadius: 8 },
  layoutStyle: { cardRadius: 12, padding: 20, sectionBg: "#ffffff" },
  stroke: { color: "#e5e7eb", weight: 1 }
};

const StateContext = createContext();
const DispatchContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "SET":
      return { ...state, ...action.payload };
    case "PATCH":
      return { ...state, [action.payload.key]: { ...state[action.payload.key], ...action.payload.value } };
    case "RESET":
      return DEFAULT_CONFIG;
    default:
      throw new Error("Unknown action " + action.type);
  }
}

export function EditorProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_CONFIG);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useEditorState() { return useContext(StateContext); }
export function useEditorDispatch() { return useContext(DispatchContext); }
