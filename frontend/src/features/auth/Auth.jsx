import React from "react";
import "./auth.css";

export default function Auth({ onOpenRegister, onOpenLogin }) {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Registro de cuentas Skireldbs</h2>

        <button className="auth-btn" onClick={onOpenRegister}>
          CREAR CUENTA
        </button>

        <button className="auth-btn" onClick={onOpenLogin}>
          INICIAR SESION
        </button>
      </div>
    </div>
  );
}
