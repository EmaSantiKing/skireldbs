import "./auth-modal.css";

export default function RegisterStep2({ onBack, onRegister }) {
  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">

        <div className="auth-modal-title">
          <div className="auth-modal-circle"></div>
          <span>CREAR CUENTA</span>
        </div>

        <p className="auth-modal-step">Registro en 2 pasos</p>
        <h3>Crea tu contraseña</h3>

        <label className="auth-label">Contraseña</label>
        <input className="auth-input" placeholder="Mínimo 8 caracteres" type="password" />

        <label className="auth-label">Repetí la contraseña</label>
        <input className="auth-input" placeholder="Repetí la contraseña" type="password" />

        <small>8 o más caracteres. Recomendado: letras, números y símbolos.</small>

        <div className="auth-buttons">
          <button className="auth-btn" onClick={onBack}>Atrás</button>
          <button className="auth-btn auth-btn-confirm" onClick={onRegister}>Registrarme</button>
        </div>

        <div className="auth-bottom-info">
          <span>Paso 2 de 2</span>
        </div>

      </div>
    </div>
  );
}
