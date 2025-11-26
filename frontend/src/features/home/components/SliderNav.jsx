import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav-section.css";

import Register1 from "../../auth/components/register1";
import Register2 from "../../auth/components/register2";
import Login from "../../auth/components/login";

import AgregarPrendas from "../../../admin/AgregarPrendas";
import EditarPrendas from "../../../admin/EditarPrendas";

const categories = [
  "Pantalones", "Tapados", "Chaquetas", "Camperas", "Remeras",
  "Tops", "Buzos", "Camisas", "Blusas", "Sweathers",
  "Calzado", "Jeans", "Polleras", "Shorts", "Blazers",
];

export default function SliderNav() {
  const navigate = useNavigate();
  
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerStep, setRegisterStep] = useState(1);

  const [user, setUser] = useState(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  const [showAgregarPrenda, setShowAgregarPrenda] = useState(false);
  const [editarPrenda, setEditarPrenda] = useState(null); // null → nada, {} → selector, objeto → modal editar
  const [prendas, setPrendas] = useState([]);

  // Traer prendas
  const fetchPrendas = async () => {
    try {
      const res = await fetch("http://localhost:3000/prendas");
      const data = await res.json();
      setPrendas(data);
      console.log("Prendas recargadas:", data);
    } catch (err) {
      console.error("Error cargando prendas", err);
    }
  };

  useEffect(() => {
    fetchPrendas();
  }, []);

  // Abrir registro/login
  const openRegister = () => { setRegisterStep(1); setShowRegister(true); };
  const closeRegister = () => setShowRegister(false);
  const handleRegisterStep = () => setRegisterStep(2);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);
  const handleLogin = (clienteData) => { setUser(clienteData); setShowLogin(false); };
  const handleLogout = () => { localStorage.removeItem("usuario"); setUser(null); };

  // Editar prenda: abrir selector
  const handleOpenEditarPrenda = async () => {
    await fetchPrendas();
    setEditarPrenda({}); // abre selector
  };

  // Eliminar prenda: abrir selector
  const handleOpenEliminarPrenda = async () => {
    await fetchPrendas();
    setEditarPrenda({ eliminar: true });
  };

  // Función para borrar prenda
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro querés eliminar esta prenda?")) return;
    try {
      await fetch(`http://localhost:3000/prendas/${id}`, { method: "DELETE" });
      // actualizar estado sin F5
      setPrendas(prev => prev.filter(p => p.ID_Prenda !== id));
    } catch (err) {
      alert("Error al eliminar la prenda");
      console.error(err);
    }
  };

  return (
    <div className="seccion-nav">
      <ul className="nav-list">
        {categories.map((cat, i) => (
          <li key={i} className="nav-item">
            <Link to={`/categoria/${cat}`} className="nav-link">{cat}</Link>
          </li>
        ))}
      </ul>

      <div className="auth-buttons">
        {!user && (
          <>
            <button className="nav-auth-btn" onClick={openLogin}>Login</button>
            <button className="nav-auth-btn" onClick={openRegister}>Register</button>
          </>
        )}

        {user && (
          <>
            <span
              className="welcome-text"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => navigate("/user/info")}
            >
              ¡Bienvenido, {user.Nombre}!
            </span>

            {/* 🛒 CARRITO */}
            <Link to="/cart" className="nav-auth-btn" style={{ fontSize: "18px" }}>
              🛒 Carrito
            </Link>

            <button className="nav-auth-btn" onClick={handleLogout}>Cerrar sesión</button>
          </>
        )}

        {user?.Email === "diseñadora@gmail.com" && (
          <>
            <button className="nav-auth-btn admin-btn" onClick={() => setShowAgregarPrenda(true)}>Agregar Prenda</button>
            <button className="nav-auth-btn admin-btn" onClick={handleOpenEditarPrenda}>Editar Prenda</button>
            <button className="nav-auth-btn admin-btn" onClick={handleOpenEliminarPrenda}>Eliminar Prenda</button>
          </>
        )}
      </div>


      {/* MODALES */}
      {showLogin && <Login onClose={closeLogin} onLogin={handleLogin} />}

      {showRegister && (
        registerStep === 1 ? (
          <Register1 onClose={closeRegister} onNext={handleRegisterStep} />
        ) : (
          <Register2 onClose={closeRegister} />
        )
      )}

      {showAgregarPrenda && (
        <AgregarPrendas
          onClose={() => setShowAgregarPrenda(false)}
          onActualizar={(nuevaPrenda) => {
            setPrendas(prev => [...prev, nuevaPrenda]); // 👈 agrega al estado
          }}
        />
      )}

      {/* Selector de prenda */}
      {editarPrenda !== null && typeof editarPrenda === 'object' && !editarPrenda.ID_Prenda && (
        <div className="auth-modal-overlay">
          <div className="auth-modal">
            <h2>{editarPrenda.eliminar ? "Selecciona la prenda a eliminar" : "Selecciona la prenda a editar"}</h2>
            <ul>
              {prendas.map(p => (
                <li key={p.ID_Prenda} style={{ marginBottom: "10px" }}>
                  {p.Nombre}{" "}
                  {editarPrenda.eliminar ? (
                    <button
                      className="auth-btn auth-btn-delete"
                      onClick={() => handleEliminar(p.ID_Prenda)}
                    >
                      Eliminar
                    </button>
                  ) : (
                    <button
                      className="auth-btn auth-btn-confirm"
                      onClick={() => setEditarPrenda(p)}
                    >
                      Editar
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <button className="auth-btn" onClick={() => setEditarPrenda(null)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Modal editar prenda */}
      {editarPrenda !== null && typeof editarPrenda === 'object' && editarPrenda.ID_Prenda && !editarPrenda.eliminar && (
        <EditarPrendas
          prenda={editarPrenda}
          onClose={() => setEditarPrenda(null)}
          onActualizar={(updatedPrenda) => {
            setPrendas(prev =>
              prev.map(p => p.ID_Prenda === updatedPrenda.ID_Prenda ? updatedPrenda : p)
            );
          }}
        />
      )}

      {console.log("editarPrenda:", editarPrenda)}
    </div>
  );
}