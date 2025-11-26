import { useState, useEffect } from "react";

export default function PersonalizarModal({
  open,
  onClose,
  prenda,
  onConfirm
}) {
  const [color, setColor] = useState("");
  const [tela, setTela] = useState("");
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (prenda) {
      setColor(prenda.opcionesColor?.[0] || "");
      setTela(prenda.opcionTela?.[0] || "");
      setCantidad(1);
    }
  }, [prenda]);

  if (!open || !prenda) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{prenda.Nombre}</h2>

        <label>Color:</label>
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          {prenda.opcionesColor?.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label>Tela:</label>
        <select value={tela} onChange={(e) => setTela(e.target.value)}>
          {prenda.opcionTela?.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </select>

        <label>Cantidad:</label>
        <input
          type="number"
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
        />

        <button
          className="confirmar-btn"
          onClick={() =>
            onConfirm({
              id: prenda.ID_Prenda,
              nombre: prenda.Nombre,
              precio: prenda.precioBase,
              color,
              tela,
              cantidad,
              imagen: prenda.imagen
            })
          }
        >
          Confirmar
        </button>

        <button className="cancelar-btn" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
