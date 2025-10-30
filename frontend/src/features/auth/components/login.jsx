import "./auth-modal.css";

export default function LoginModal({ onClose, onLogin }) {
  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">

        <div className="auth-modal-title">
          <div className="auth-modal-circle"></div>
          <span>Iniciar sesión</span>
        </div>

        <label className="auth-label">Mail</label>
        <input className="auth-input" placeholder="Ingresa tu mail" type="email" />

        <label className="auth-label">Contraseña</label>
        <input className="auth-input" placeholder="Ingresa tu contraseña" type="password" />

        <div className="auth-buttons" style={{ justifyContent: "flex-end" }}>
          <button className="auth-btn auth-btn-confirm" onClick={onLogin}>Siguiente</button>
        </div>

      </div>
    </div>
  );
}
