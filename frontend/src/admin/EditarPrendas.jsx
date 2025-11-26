import { useState, useEffect } from "react";
import "../features/auth/components/auth-modal.css";

export default function EditarPrenda({ onClose, prenda, onActualizar }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioBase, setPrecioBase] = useState("");
  const [opcionTela, setOpcionTela] = useState("");
  const [opcionesColor, setOpcionesColor] = useState("");
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);

  // Precargar los datos de la prenda
  useEffect(() => {
    if (!prenda) {
      onClose();
      return;
    }
    setNombre(prenda.Nombre || "");
    setDescripcion(prenda.Descripcion || "");
    setPrecioBase(prenda.precioBase || "");
    setOpcionTela(prenda.opcionTela || "");
    setOpcionesColor(prenda.opcionesColor || "");
    setImagen(null);
  }, [prenda, onClose]);

  const handleEditar = async () => {
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
      if (imagen) formData.append("imagen", imagen);

      const res = await fetch(`http://localhost:3000/prendas/${prenda.ID_Prenda}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al actualizar la prenda");
      }

      // 👇 Backend debería devolver la prenda actualizada
      const updatedPrenda = await res.json();

      // Notificar al padre con la prenda nueva
      if (onActualizar) onActualizar(updatedPrenda);

      // Cerrar modal
      onClose();

    } catch (err) {
      console.error("Error en handleEditar:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!prenda) {
    return null;
  }

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <h2>Editar prenda</h2>

        <label className="auth-label">Nombre</label>
        <input className="auth-input" value={nombre} onChange={e => setNombre(e.target.value)} />

        <label className="auth-label">Descripción</label>
        <input className="auth-input" value={descripcion} onChange={e => setDescripcion(e.target.value)} />

        <label className="auth-label">Precio base</label>
        <input className="auth-input" type="number" value={precioBase} onChange={e => setPrecioBase(e.target.value)} />

        <label className="auth-label">Tela</label>
        <input className="auth-input" value={opcionTela} onChange={e => setOpcionTela(e.target.value)} />

        <label className="auth-label">Colores</label>
        <input className="auth-input" value={opcionesColor} onChange={e => setOpcionesColor(e.target.value)} />

        <label className="auth-label">Imagen (opcional)</label>
        <input type="file" onChange={e => setImagen(e.target.files[0])} />

        <div className="auth-buttons">
          <button className="auth-btn" onClick={onClose}>Cancelar</button>
          <button className="auth-btn auth-btn-confirm" onClick={handleEditar} disabled={loading}>
            {loading ? "Cargando..." : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}