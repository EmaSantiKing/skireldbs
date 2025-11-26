import { useState } from "react";
import "../features/auth/components/auth-modal.css";

export default function AgregarPrenda({ onClose, onActualizar }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioBase, setPrecioBase] = useState("");
  const [opcionTela, setOpcionTela] = useState("");
  const [opcionesColor, setOpcionesColor] = useState("");
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAgregar = async () => {
    if (!nombre || !descripcion || !precioBase || !opcionTela || !opcionesColor) {
      alert("Completá todos los campos (la imagen es opcional)");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("Nombre", nombre);
      formData.append("Descripcion", descripcion);
      formData.append("precioBase", precioBase);
      formData.append("opcionTela", opcionTela);
      formData.append("opcionesColor", opcionesColor);

      if (imagen) {
        formData.append("imagen", imagen);
      }

      const res = await fetch("http://localhost:3000/prendas", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Error al crear la prenda");
      }

      // 👇 Backend debería devolver la prenda creada
      const nuevaPrenda = await res.json();

      // Notificar al padre con la prenda nueva
      if (onActualizar) onActualizar(nuevaPrenda);

      onClose(); // cerrar modal
    } catch (err) {
      console.error(err);
      alert("Error en el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">

        <div className="auth-modal-title">
          <div className="auth-modal-circle"></div>
          <span>Agregar nueva prenda</span>
        </div>

        <label className="auth-label">Nombre</label>
        <input
          className="auth-input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de la prenda"
        />

        <label className="auth-label">Descripción</label>
        <input
          className="auth-input"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
        />

        <label className="auth-label">Precio Base</label>
        <input
          className="auth-input"
          value={precioBase}
          onChange={(e) => setPrecioBase(e.target.value)}
          placeholder="Precio base"
          type="number"
        />

        <label className="auth-label">Tela</label>
        <input
          className="auth-input"
          value={opcionTela}
          onChange={(e) => setOpcionTela(e.target.value)}
          placeholder="Tipo de tela"
        />

        <label className="auth-label">Colores</label>
        <input
          className="auth-input"
          value={opcionesColor}
          onChange={(e) => setOpcionesColor(e.target.value)}
          placeholder="Colores disponibles"
        />

        <label className="auth-label">Imagen (opcional)</label>
        <input
          type="file"
          accept="image/*"
          className="auth-input"
          onChange={(e) => setImagen(e.target.files[0])}
        />

        <div className="auth-buttons" style={{ justifyContent: "space-between" }}>
          <button className="auth-btn" onClick={onClose}>
            Cancelar
          </button>

          <button
            className="auth-btn auth-btn-confirm"
            onClick={handleAgregar}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Agregar prenda"}
          </button>
        </div>

      </div>
    </div>
  );
}