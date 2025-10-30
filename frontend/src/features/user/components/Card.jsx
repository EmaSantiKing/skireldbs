import React from "react";
import "./card.css";

export default function Card() {
  return (
    <div className="user-card">
      <img
        src="/assets/avatar.png"
        alt="Avatar del usuario"
        className="user-avatar"
      />
      <div className="user-info">
        <h2 className="user-name">Nombre de usuario</h2>
        <p className="user-email">gmail del usuario</p>
      </div>
    </div>
  );
}
