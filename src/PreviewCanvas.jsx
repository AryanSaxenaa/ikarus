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

  const LayoutA = () => {
    const mainContent = (
      <UICard cfg={cfg} onClick={() => setSelected(null)} isSelected={selected === "card-main"}>
        <div style={typography}>
          <h2 style={{ marginTop: 0 }}>{cfg.layout === "layoutA" ? "Primary Title" : "Alternate Title"}</h2>
          <p>Sample paragraph — previewing font, size and weight.</p>
          <div style={{ textAlign: cfg.button.align }}>
            <UIButton nodeId="button-main" onSelect={(id) => setSelected(id)} isSelected={selected === "button-main"} config={cfg.button}>
              Call to action
            </UIButton>
          </div>
        </div>
      </UICard>
    );

    const gallery = (
      <div style={{ marginTop: cfg.gallery.align === "top" || cfg.gallery.align === "bottom" ? 18 : 0 }}>
        <Gallery cfg={cfg.gallery} nodeId="gallery-main" onSelect={(id) => setSelected(id)} isSelected={selected === "gallery-main"} />
      </div>
    );

    // Position gallery based on alignment setting
    if (cfg.gallery.align === "top") {
      return (
        <div>
          {gallery}
          {mainContent}
        </div>
      );
    } else if (cfg.gallery.align === "left") {
      return (
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div style={{ flex: "0 0 300px" }}>
            {gallery}
          </div>
          <div style={{ flex: 1 }}>
            {mainContent}
          </div>
        </div>
      );
    } else if (cfg.gallery.align === "right") {
      return (
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            {mainContent}
          </div>
          <div style={{ flex: "0 0 300px" }}>
            {gallery}
          </div>
        </div>
      );
    } else { // bottom (default)
      return (
        <div>
          {mainContent}
          {gallery}
        </div>
      );
    }
  };

  const LayoutB = () => {
    const mainContent = (
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
        </div>
      </UICard>
    );

    const gallery = (
      <div style={{ marginTop: cfg.gallery.align === "top" || cfg.gallery.align === "bottom" ? 18 : 0 }}>
        <Gallery cfg={cfg.gallery} nodeId="gallery-main" onSelect={(id) => setSelected(id)} isSelected={selected === "gallery-main"} />
      </div>
    );

    // Position gallery based on alignment setting
    if (cfg.gallery.align === "top") {
      return (
        <div>
          {gallery}
          {mainContent}
        </div>
      );
    } else if (cfg.gallery.align === "left") {
      return (
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div style={{ flex: "0 0 300px" }}>
            {gallery}
          </div>
          <div style={{ flex: 1 }}>
            {mainContent}
          </div>
        </div>
      );
    } else if (cfg.gallery.align === "right") {
      return (
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            {mainContent}
          </div>
          <div style={{ flex: "0 0 300px" }}>
            {gallery}
          </div>
        </div>
      );
    } else { // bottom (default)
      return (
        <div>
          {mainContent}
          {gallery}
        </div>
      );
    }
  };

  return (
    <div style={{ flex: 1, padding: 24, backgroundColor: cfg.layoutStyle.sectionBg }} onClick={() => setSelected(null)}>
      {cfg.layout === "layoutA" ? <LayoutA /> : <LayoutB />}
    </div>
  );
}

function Gallery({ cfg, nodeId, onSelect, isSelected }) {
  const style = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: cfg.gap + "px",
    outline: isSelected ? "2px dashed #f59e0b" : "none",
    padding: 6
  };
  return (
    <div style={style} onClick={(e) => { e.stopPropagation(); onSelect?.(nodeId); }}>
      {[1, 2, 3, 4].map((i) => (
        <img 
          key={i} 
          src="/image.png" 
          alt={`Gallery image ${i}`}
          style={{ 
            height: 88, 
            width: "100%", 
            objectFit: "cover",
            borderRadius: cfg.imgRadius + "px"
          }}
        />
      ))}
    </div>
  );
}
