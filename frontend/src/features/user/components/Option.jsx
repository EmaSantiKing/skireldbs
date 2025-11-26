import React from "react";
import "./option.css";
import { Link } from "react-router-dom";

export default function Option({ title, description, link }) {
  // Asegurar que link siempre sea un string válido
  const linked = "/user/" + (link || "");

  return (
    <Link to={linked} className="option-card">
      <h3 className="option-title">{title}</h3>
      <p className="option-description">{description}</p>
    </Link>
  );
}
