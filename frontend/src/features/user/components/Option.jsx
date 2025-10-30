import React from "react";
import "./option.css";

export default function Option({ title, description }) {
  return (
    <div className="option-card">
      <h3 className="option-title">{title}</h3>
      <p className="option-description">{description}</p>
    </div>
  );
}
