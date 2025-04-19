import React from "react";
import "./BottomBar.css";

const iconMap = {
  "Baby Information": "👶",
  "Baby Face Photo": "📸",
  "Baby Foot Print": "🦶",
  "Baby Retina Print": "👁️",
  "Mother Information": "👩",
  "Mother Finger Print": "🖐️",
  "EBM Biography": "📖",
  "EBM Delivery": "🚚",
  "EBM Use": "🍼",
  "EBM Tables": "📊",
  "EBM Verification": "✅",
  "QR Code": "🔳",
  "EBM Calculation": "➕",
  "AdminProfile": "🛡️",
  "NurseProfile": "💉",
  "ParentProfile": "🧑‍🍼",
  "Messaging": "💬",
};

const BottomBar = ({ sectionName }) => {
  if (!sectionName) return null;

  const icon = iconMap[sectionName] || "";

  return (
    <div className="bottom-bar">
      <span style={{ fontSize: "20px", marginRight: "8px" }}>{icon}</span>
      <h4>{sectionName}</h4>
    </div>
  );
};

export default BottomBar;
