import { useState } from "react";
import "./auth-modal.css";
import Register2 from "./register2";

export default function Register1({ onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
  });

  const handleNext = () => {
    if (!formData.nombre || !formData.apellido || !formData.email) {
      alert("Completa todos los campos para continuar");
      return;
    }
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Si estamos en paso 2, renderizamos Register2
  if (step === 2) {
    return <Register2 onBack={handleBack} formData={formData} onRegister={onClose} />;
  }

  // Paso 1
  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <div className="auth-modal-title">
          <div className="auth-modal-circle"></div>
          <span>CREAR CUENTA</span>
        </div>

        <p className="auth-modal-step">Registro en 2 pasos</p>
        <h3>¿Cómo te llamas?</h3>

        <label className="auth-label">Nombre</label>
        <input
          className="auth-input"
          name="nombre"
          placeholder="Ej: Tizianno"
          value={formData.nombre}
          onChange={handleChange}
        />

        <label className="auth-label">Apellido</label>
        <input
          className="auth-input"
          name="apellido"
          placeholder="Ej: Martinez"
          value={formData.apellido}
          onChange={handleChange}
        />

        <label className="auth-label">Mail</label>
        <input
          className="auth-input"
          name="email"
          placeholder="Ej: pepito1234@gmail.com"
          value={formData.email}
          onChange={handleChange}
        />

        <div className="auth-buttons">
          <button className="auth-btn" onClick={onClose}>
            Atrás
          </button>
          <button className="auth-btn auth-btn-confirm" onClick={handleNext}>
            Siguiente
          </button>
        </div>

        <div className="auth-bottom-info">
          <span>Paso 1 de 2</span>
        </div>
      </div>
    </div>
  );
}
