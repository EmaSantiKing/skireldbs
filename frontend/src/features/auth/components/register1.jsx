import "./auth-modal.css";

export default function RegisterStep1({ onNext, onClose }) {
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
        <input className="auth-input" placeholder="Ej: Tizianno" />

        <label className="auth-label">Apellido</label>
        <input className="auth-input" placeholder="Ej: Martinez" />

        <label className="auth-label">Mail</label>
        <input className="auth-input" placeholder="Ej: pepito1234@gmail.com" />

        <div className="auth-buttons">
          <button className="auth-btn" onClick={onClose}>Atrás</button>
          <button className="auth-btn auth-btn-confirm" onClick={onNext}>Siguiente</button>
        </div>

        <div className="auth-bottom-info">
          <span>Paso 1 de 2</span>
        </div>

      </div>
    </div>
  );
}
