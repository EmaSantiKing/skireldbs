import { useEffect, useState } from "react";
import ModalContornos from "./ModalContornos";
import "./prendas-section.css";

export default function PrendasSection() {
  const [prendas, setPrendas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [prendaSeleccionada, setPrendaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchPrendas = async () => {
      try {
        const res = await fetch("http://localhost:3000/prendas");
        const data = await res.json();
        setPrendas(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error cargando prendas:", err);
      }
    };
    fetchPrendas();
  }, []);

  // abrir modal para elegir medidas/tela/color
  const pedirContornos = (prenda) => {
    setPrendaSeleccionada(prenda);
    setModalOpen(true);
  };

  // confirmar medidas y agregar al carrito
  const confirmarContornos = (medidas) => {
    if (!medidas || typeof medidas !== "object") {
      alert("No se recibieron las medidas. Por favor completá el formulario.");
      return;
    }

    const p = prendaSeleccionada;
    if (!p) {
      alert("No hay prenda seleccionada.");
      return;
    }

    const tela = (medidas.telaSeleccionada ?? medidas.tela ?? p.opcionTela?.split(",")[0] ?? "").toString().trim();
    const color = (medidas.colorSeleccionado ?? medidas.color ?? p.opcionesColor?.split(",")[0] ?? "").toString().trim();

    if (!tela || !color) {
      alert("Por favor seleccioná la tela y el color antes de agregar la prenda al carrito.");
      return;
    }

    let carritoActual = [];
    try {
      const raw = localStorage.getItem("carrito");
      carritoActual = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(carritoActual)) carritoActual = [];
    } catch (err) {
      carritoActual = [];
    }

    const item = {
      id: p.ID_Prenda ?? `prenda-${Date.now()}`,
      ID_prenda: p.ID_Prenda ?? null,
      nombre: p.Nombre ?? "Prenda",
      precio: Number(p.precioBase ?? 0),
      telaSeleccionada: tela,
      colorSeleccionado: color,
      imagen: p.imagen ? `uploads/${p.imagen}` : "",
      cantidad: 1,
      cintura: medidas.cintura ?? null,
      cadera: medidas.cadera ?? null,
      pecho: medidas.pecho ?? null
    };

    const existsIndex = carritoActual.findIndex((it) =>
      it.ID_prenda && item.ID_prenda
        ? it.ID_prenda === item.ID_prenda &&
          (String(it.telaSeleccionada ?? it.tela ?? "").trim()) === item.telaSeleccionada &&
          (String(it.colorSeleccionado ?? it.color ?? "").trim()) === item.colorSeleccionado
        : it.id === item.id &&
          (String(it.telaSeleccionada ?? it.tela ?? "").trim()) === item.telaSeleccionada &&
          (String(it.colorSeleccionado ?? it.color ?? "").trim()) === item.colorSeleccionado
    );

    if (existsIndex >= 0) {
      carritoActual[existsIndex].cantidad = Number(carritoActual[existsIndex].cantidad) + 1;
    } else {
      carritoActual.push(item);
    }

    try {
      localStorage.setItem("carrito", JSON.stringify(carritoActual));
    } catch (err) {
      console.error("Error guardando carrito en localStorage:", err);
      alert("No se pudo guardar el carrito localmente.");
      return;
    }

    window.dispatchEvent(new Event("carritoUpdated"));

    alert("Prenda personalizada agregada al carrito 💙🛒");

    setModalOpen(false);
    setPrendaSeleccionada(null);
  };

  return (
    <section className="prendas-section">
      <h2 className="titulo-prendas">Nuevas prendas</h2>

      <div className="grid-prendas">
        {prendas.map((p) => (
          <div key={p.ID_Prenda} className="card-prenda">
            <div className="img-container">
              {p.imagen ? (
                <img src={`http://localhost:3000/uploads/${p.imagen}`} alt={p.Nombre} />
              ) : (
                <div className="img-placeholder">Sin imagen</div>
              )}
            </div>

            <h3>{p.Nombre}</h3>
            <p className="descripcion">{p.Descripcion}</p>

            <div className="detalles">
              <span>Tela: {p.opcionTela}</span>
              <span>Colores: {p.opcionesColor}</span>
            </div>

            <p className="precio">${p.precioBase}</p>

            <div className="botones-card">
              <button className="btn-detalle">Ver detalle</button>
              <button
                className="btn-carrito"
                onClick={() => pedirContornos(p)}
                aria-label={`Agregar ${p.Nombre} al carrito`}
              >
                Agregar al carrito 🛒
              </button>
            </div>
          </div>
        ))}
      </div>

      <ModalContornos
        open={modalOpen}
        prenda={prendaSeleccionada}
        onClose={() => {
          setModalOpen(false);
          setPrendaSeleccionada(null);
        }}
        onConfirm={confirmarContornos}
      />
    </section>
  );
}
