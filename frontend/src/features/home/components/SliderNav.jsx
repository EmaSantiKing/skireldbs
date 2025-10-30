import React from "react";
import "./nav-section.css";

const categories = [
  "Pantalones",
  "Tapados",
  "Chaquetas",
  "Camperas",
  "Remeras",
  "Tops",
  "Buzos",
  "Camisas",
  "Blusas",
  "Sweathers",
  "Calzado",
  "Jeans",
  "Polleras",
  "Shorts",
  "Blazers",
];

export default function SeccionNav() {
  return (
    <nav className="seccion-nav">
      <ul className="nav-list">
        {categories.map((cat, index) => (
          <li key={index} className="nav-item">
            <a href="#" className="nav-link">{cat}</a>
            {index !== categories.length - 1 && <span className="divider">|</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}
