import React from "react";
import { EditorProvider } from "./EditorContext.jsx";
import { SelectionProvider } from "./SelectionContext.jsx";
import ConfigPanel from "./ConfigPanel";
import PreviewCanvas from "./PreviewCanvas";
import InspectorPanel from "./InspectorPanel";

export default function App() {
  return (
    <EditorProvider>
      <SelectionProvider>
        <div style={{ display: "flex", height: "100vh" }}>
          <PreviewCanvas />
          <ConfigPanel />
          <InspectorPanel />
        </div>
      </SelectionProvider>
    </EditorProvider>
  );
}
