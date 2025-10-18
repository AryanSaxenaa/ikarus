import React from "react";
export default function UIButton({ config, children, nodeId, onSelect, isSelected }) {
  const s = {
    borderRadius: config.radius + "px",
    backgroundColor: config.bg,
    color: config.color,
    padding: "10px 16px",
    border: isSelected ? "2px dashed #2563eb" : "none",
    cursor: "pointer",
    boxShadow:
      config.shadow === "small"
        ? "0 1px 3px rgba(0,0,0,0.08)"
        : config.shadow === "medium"
        ? "0 4px 8px rgba(0,0,0,0.12)"
        : config.shadow === "large"
        ? "0 8px 20px rgba(0,0,0,0.16)"
        : "none"
  };
  return <button style={s} onClick={(e)=>{e.stopPropagation();onSelect?.(nodeId)}}>{children}</button>;
}
