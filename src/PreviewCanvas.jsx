import React from "react";
import { useEditorState } from "./EditorContext.jsx";
import { useSelection } from "./SelectionContext.jsx";
import UIButton from "./components/UIButton";
import UICard from "./components/UICard";

export default function PreviewCanvas() {
  const cfg = useEditorState();
  const { selected, setSelected } = useSelection();

  const typography = {
    fontFamily: cfg.typography.family,
    fontSize: cfg.typography.size + "px",
    fontWeight: cfg.typography.weight
  };

  const LayoutA = () => (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ marginTop: 0 }}>Left column</h3>
        <p style={{ marginTop: 0 }}>This is the left column content for Layout A.</p>
      </div>
      <div style={{ flex: 2 }}>
        <UICard cfg={cfg} onClick={() => setSelected(null)} isSelected={selected === "card-main"}>
          <div style={typography}>
            <h2 style={{ marginTop: 0 }}>{cfg.layout === "layoutA" ? "Primary Title" : "Alternate Title"}</h2>
            <p>Sample paragraph — previewing font, size and weight.</p>
            <div style={{ textAlign: cfg.button.align }}>
              <UIButton nodeId="button-main" onSelect={(id) => setSelected(id)} isSelected={selected === "button-main"} config={cfg.button}>
                Call to action
              </UIButton>
            </div>

            <div style={{ marginTop: 18 }}>
              <Gallery cfg={cfg.gallery} nodeId="gallery-main" onSelect={(id) => setSelected(id)} isSelected={selected === "gallery-main"} />
            </div>
          </div>
        </UICard>
      </div>
    </div>
  );

  const LayoutB = () => (
    <div>
      <UICard cfg={cfg} onClick={() => setSelected(null)} isSelected={selected === "card-main"}>
        <div style={typography}>
          <h2 style={{ marginTop: 0 }}>Alternate layout header</h2>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p>Intro text on the left</p>
            </div>
            <div>
              <UIButton nodeId="button-main" onSelect={(id) => setSelected(id)} isSelected={selected === "button-main"} config={cfg.button}>
                Alternate CTA
              </UIButton>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <Gallery cfg={cfg.gallery} nodeId="gallery-main" onSelect={(id) => setSelected(id)} isSelected={selected === "gallery-main"} />
          </div>
        </div>
      </UICard>
    </div>
  );

  return (
    <div style={{ flex: 1, padding: 24 }} onClick={() => setSelected(null)}>
      {cfg.layout === "layoutA" ? <LayoutA /> : <LayoutB />}
    </div>
  );
}

function Gallery({ cfg, nodeId, onSelect, isSelected }) {
  const style = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: cfg.gap + "px",
    justifyItems: cfg.align.includes("right") ? "end" : cfg.align.includes("left") ? "start" : "center",
    outline: isSelected ? "2px dashed #f59e0b" : "none",
    padding: 6
  };
  return (
    <div style={style} onClick={(e) => { e.stopPropagation(); onSelect?.(nodeId); }}>
      {[1, 2, 3, 4].map((i) => (
        <img key={i} src="/src/assets/placeholder.png" alt="thumb" style={{ height: 88, width: "100%", objectFit: "cover", borderRadius: cfg.imgRadius + "px" }} />
      ))}
    </div>
  );
}
