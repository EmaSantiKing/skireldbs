import { useState } from "react";
import "./auth-modal.css";

export default function Register2({ formData, onBack, onRegister }) {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [contornoPecho, setContornoPecho] = useState(formData.contorno_pecho || 0);
  const [contornoCintura, setContornoCintura] = useState(formData.contorno_cintura || 0);
  const [contornoCadera, setContornoCadera] = useState(formData.contorno_cadera || 0);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!password || !repeatPassword) {
      alert("Completa ambos campos de contraseña");
      return;
    }
    if (password !== repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nombre: formData.nombre,
          Apellido: formData.apellido,
          Email: formData.email,
          contrasena: password,
          contorno_pecho: Number(contornoPecho),
          contorno_cintura: Number(contornoCintura),
          contorno_cadera: Number(contornoCadera),
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Error al registrar cliente");
      }

      const data = await res.json(); // data debe incluir ID_Cliente
      // Guardamos la info del usuario en localStorage
      localStorage.setItem(
        "usuario",
        JSON.stringify({
          ID_Cliente: data.ID_Cliente,
          nombreUsuario: `${formData.nombre} ${formData.apellido}`,
          email: formData.email,
        })
      );

      alert("Cliente registrado exitosamente!");
      onRegister(); // cierra el modal
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <div className="auth-modal-title">
          <div className="auth-modal-circle"></div>
          <span>CREAR CUENTA</span>
        </div>

        <p className="auth-modal-step">Registro en 2 pasos</p>
        <h3>Crea tu contraseña y contornos</h3>

        <label className="auth-label">Contraseña</label>
        <input
          className="auth-input"
          placeholder="Mínimo 8 caracteres"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="auth-label">Repetí la contraseña</label>
        <input
          className="auth-input"
          placeholder="Repetí la contraseña"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        <label className="auth-label">Contorno Pecho</label>
        <input
          className="auth-input"
          type="number"
          value={contornoPecho}
          onChange={(e) => setContornoPecho(e.target.value)}
        />

        <label className="auth-label">Contorno Cintura</label>
        <input
          className="auth-input"
          type="number"
          value={contornoCintura}
          onChange={(e) => setContornoCintura(e.target.value)}
        />

        <label className="auth-label">Contorno Cadera</label>
        <input
          className="auth-input"
          type="number"
          value={contornoCadera}
          onChange={(e) => setContornoCadera(e.target.value)}
        />

        <small>8 o más caracteres para la contraseña. Recomendado: letras, números y símbolos.</small>

        <div className="auth-buttons">
          <button className="auth-btn" onClick={onBack} disabled={loading}>
            Atrás
          </button>
          <button className="auth-btn auth-btn-confirm" onClick={handleRegister} disabled={loading}>
            {loading ? "Registrando..." : "Registrarme"}
          </button>
        </div>

        <div className="auth-bottom-info">
          <span>Paso 2 de 2</span>
        </div>
      </div>
    </div>
  );
}
