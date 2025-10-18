import React from "react";
import { useEditorState, useEditorDispatch } from "./EditorContext";

function ExportJSON({ config }) {
  const doExport = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ui-config.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  return <button onClick={doExport}>Export JSON</button>;
}

function ImportJSON() {
  const dispatch = useEditorDispatch();
  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        dispatch({ type: "SET", payload: parsed });
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(f);
  };
  return <input type="file" accept="application/json" onChange={onFile} />;
}

export default function ConfigPanel() {
  const cfg = useEditorState();
  const dispatch = useEditorDispatch();

  const setPatch = (key, value) => dispatch({ type: "PATCH", payload: { key, value } });

  return (
    <aside style={{ width: 320, padding: 16, borderLeft: "1px solid #eee", overflowY: "auto", background: "var(--panel-bg)" }}>
      <h3>Global Editor</h3>

      <div>
        <label>Layout</label>
        <select value={cfg.layout} onChange={(e) => dispatch({ type: "SET", payload: { layout: e.target.value } })}>
          <option value="layoutA">Layout A</option>
          <option value="layoutB">Layout B</option>
        </select>
      </div>

      <hr />

      <h4>Typography</h4>
      <div>
        <label>Font family</label>
        <select value={cfg.typography.family} onChange={(e) => setPatch("typography", { family: e.target.value })}>
          <option value="Inter, system-ui, sans-serif">Inter</option>
          <option value="Roboto, sans-serif">Roboto</option>
          <option value="Poppins, sans-serif">Poppins</option>
        </select>
      </div>
      <div>
        <label>Size</label>
        <input type="number" min="10" max="60" value={cfg.typography.size}
               onChange={(e) => setPatch("typography", { size: Number(e.target.value) })} />
      </div>
      <div>
        <label>Weight</label>
        <select value={cfg.typography.weight} onChange={(e) => setPatch("typography", { weight: Number(e.target.value) })}>
          <option value={400}>400</option>
          <option value={500}>500</option>
          <option value={600}>600</option>
          <option value={700}>700</option>
        </select>
      </div>

      <hr />
      <h4>Button</h4>
      <div>
        <label>Radius</label>
        <input type="range" min="0" max="48" value={cfg.button.radius}
               onChange={(e) => setPatch("button", { radius: Number(e.target.value) })} />
      </div>
      <div>
        <label>Background</label>
        <input type="color" value={cfg.button.bg} onChange={(e) => setPatch("button", { bg: e.target.value })} />
      </div>
      <div>
        <label>Text color</label>
        <input type="color" value={cfg.button.color} onChange={(e) => setPatch("button", { color: e.target.value })} />
      </div>

      <hr />
      <h4>Layout style</h4>
      <div>
        <label>Card corner radius</label>
        <input type="number" min="0" value={cfg.layoutStyle.cardRadius}
               onChange={(e) => setPatch("layoutStyle", { cardRadius: Number(e.target.value) })} />
      </div>
      <div>
        <label>Padding</label>
        <input type="number" min="0" value={cfg.layoutStyle.padding}
               onChange={(e) => setPatch("layoutStyle", { padding: Number(e.target.value) })} />
      </div>

      <hr />
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
        <ExportJSON config={cfg} />
        <ImportJSON />
      </div>
    </aside>
  );
}
