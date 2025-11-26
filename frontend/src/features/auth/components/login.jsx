import { useState } from "react";
import "./auth-modal.css";

export default function Login({ onClose, onLogin, modoCarrito = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Completa ambos campos");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/cliente/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, contrasena: password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Error al iniciar sesión");
      }

      const data = await res.json();
      
      // 🔹 Guardar datos importantes en localStorage
      localStorage.setItem("ID_Cliente", data.cliente.ID_Cliente);
      localStorage.setItem("usuario", JSON.stringify(data.cliente));

      // 👇 ALERT DIFERENCIADO SEGÚN EL PROPS modoCarrito
      if (modoCarrito) {
        alert("Credencial válida ✅");
      } else {
        alert(`Bienvenido ${data.cliente.Nombre}!`);
      }

      if (onLogin) onLogin(data.cliente);
      onClose();
    } catch (err) {
      alert(err.message);
      console.error("Error login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <div className="auth-modal-title">
          <div className="auth-modal-circle"></div>
          <span>Iniciar sesión</span>
        </div>

        <label className="auth-label">Mail</label>
        <input
          className="auth-input"
          placeholder="Ingresa tu mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="auth-label">Contraseña</label>
        <input
          className="auth-input"
          placeholder="Ingresa tu contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="auth-buttons" style={{ justifyContent: "flex-end" }}>
          <button
            className="auth-btn auth-btn-confirm"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}
