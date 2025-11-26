import { useState, useEffect } from "react";

export default function ModalContornos({ open, onClose, prenda, onConfirm }) {
  const [cintura, setCintura] = useState("");
  const [cadera, setCadera] = useState("");
  const [pecho, setPecho] = useState("");
  const [color, setColor] = useState("");
  const [tela, setTela] = useState("");

  useEffect(() => {
    if (prenda) {
      setColor(prenda.opcionesColor?.split(",")[0] || "");
      setTela(prenda.opcionTela?.split(",")[0] || "");
    }
  }, [prenda]);

  if (!open || !prenda) return null;

  const handleConfirm = () => {
    // Validación: todos los campos obligatorios
    if (!cintura || !cadera || !pecho || !color || !tela) {
      alert("Por favor completá todos los campos antes de continuar.");
      return;
    }

    // Enviar los valores al onConfirm
    onConfirm({ cintura, cadera, pecho, color, tela });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{prenda.Nombre}</h2>

        <label>Tela:</label>
        <select value={tela} onChange={(e) => setTela(e.target.value)}>
          {prenda.opcionTela?.split(",").map((t, i) => (
            <option key={i} value={t}>{t}</option>
          ))}
        </select>

        <label>Color:</label>
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          {prenda.opcionesColor?.split(",").map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        <label>Cintura:</label>
        <input
          type="number"
          min="1"
          value={cintura}
          onChange={(e) => setCintura(e.target.value)}
        />

        <label>Cadera:</label>
        <input
          type="number"
          min="1"
          value={cadera}
          onChange={(e) => setCadera(e.target.value)}
        />

        <label>Pecho:</label>
        <input
          type="number"
          min="1"
          value={pecho}
          onChange={(e) => setPecho(e.target.value)}
        />

        <button onClick={handleConfirm} className="confirmar-btn">
          Agregar al carrito
        </button>
        <button onClick={onClose} className="cancelar-btn">Cancelar</button>
      </div>
    </div>
  );
}
