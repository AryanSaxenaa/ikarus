import React from "react";
export default function UICard({ cfg, children, onClick, isSelected }) {
  const style = {
    padding: cfg.layoutStyle.padding,
    background: cfg.layoutStyle.sectionBg,
    borderRadius: cfg.layoutStyle.cardRadius,
    border: `${cfg.stroke.weight}px solid ${cfg.stroke.color}`,
    boxShadow: isSelected ? "0 6px 18px rgba(0,0,0,0.06)" : "none"
  };
  return <div style={style} onClick={onClick}>{children}</div>;
}
