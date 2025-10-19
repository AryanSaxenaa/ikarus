import React from "react";
import { useSelection } from "./SelectionContext";
import { useEditorState, useEditorDispatch } from "./EditorContext";

export default function InspectorPanel() {
  const { selected } = useSelection();
  const cfg = useEditorState();
  const dispatch = useEditorDispatch();

  if (!selected) {
    return (
      <aside style={{ width: 220, padding: 12 }}>
      </aside>
    );
  }

  if (selected === "button-main") {
    const btn = cfg.button;
    return (
      <aside style={{ width: 220, padding: 12 }}>
        <h4>Button Inspector</h4>
        <div>
          <label>Radius</label>
          <input type="range" min="0" max="48" value={btn.radius}
                 onChange={(e) => dispatch({ type: "PATCH", payload: { key: "button", value: { radius: Number(e.target.value) } } })} />
        </div>
        <div>
          <label>Bg</label>
          <input type="color" value={btn.bg} onChange={(e) => dispatch({ type: "PATCH", payload: { key: "button", value: { bg: e.target.value } } })} />
        </div>
        <div>
          <label>Text</label>
          <input type="color" value={btn.color} onChange={(e) => dispatch({ type: "PATCH", payload: { key: "button", value: { color: e.target.value } } })} />
        </div>
        <div>
          <label>Align</label>
          <select value={btn.align} onChange={(e) => dispatch({ type: "PATCH", payload: { key: "button", value: { align: e.target.value } } })}>
            <option value="left">left</option>
            <option value="center">center</option>
            <option value="right">right</option>
          </select>
        </div>
      </aside>
    );
  }

  if (selected === "gallery-main") {
    const g = cfg.gallery;
    return (
      <aside style={{ width: 220, padding: 12 }}>
        <h4>Gallery Inspector</h4>
        <div>
          <label>Gap</label>
          <input type="number" min="0" value={g.gap} onChange={(e) => dispatch({ type: "PATCH", payload: { key: "gallery", value: { gap: Number(e.target.value) } } })} />
        </div>
        <div>
          <label>Image radius</label>
          <input type="number" min="0" value={g.imgRadius} onChange={(e) => dispatch({ type: "PATCH", payload: { key: "gallery", value: { imgRadius: Number(e.target.value) } } })} />
        </div>
        <div>
          <label>Alignment</label>
          <select value={g.align} onChange={(e) => dispatch({ type: "PATCH", payload: { key: "gallery", value: { align: e.target.value } } })}>
            <option value="grid-left">left</option>
            <option value="grid-center">center</option>
            <option value="grid-right">right</option>
          </select>
        </div>
      </aside>
    );
  }

  return <aside style={{ width: 220, padding: 12 }}>Unknown selection</aside>;
}
