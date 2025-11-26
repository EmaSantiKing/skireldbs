import React, { useState } from "react";
import "./auth.css";
import Register1 from "./components/register1";
import Register2 from "./components/register2";
import Login from "./components/login";

export default function Auth() {
  const [mode, setMode] = useState(null); // 'register' o 'login'
  const [step, setStep] = useState(1); // paso del registro

  const openRegister = () => { setMode("register"); setStep(1); };
  const openLogin = () => setMode("login");
  const closeModal = () => setMode(null);

  return (
    <div className="auth-container">
      {!mode && (
        <div className="auth-box">
          <h2 className="auth-title">Registro de cuentas Skireldbs</h2>
          <button className="auth-btn" onClick={openRegister}>CREAR CUENTA</button>
          <button className="auth-btn" onClick={openLogin}>INICIAR SESIÓN</button>
        </div>
      )}

      {/* Registro */}
      {mode === "register" && step === 1 && (
        <Register1 onNext={() => setStep(2)} onClose={closeModal} />
      )}
      {mode === "register" && step === 2 && (
        <Register2 onBack={() => setStep(1)} onRegister={closeModal} />
      )}

      {/* Login */}
      {mode === "login" && <Login onClose={closeModal} />}
    </div>
  );
}
