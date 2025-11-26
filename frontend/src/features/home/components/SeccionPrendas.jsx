import { useEffect, useState } from "react";
import PersonalizarModal from "../components/PersonalizarModal";

export default function SeccionPrendas() {
  const [prendas, setPrendas] = useState([]);

  // Estados del modal
  const [modalOpen, setModalOpen] = useState(false);
  const [prendaSeleccionada, setPrendaSeleccionada] = useState(null);

  const cargarPrendas = async () => {
    try {
      const res = await fetch("http://localhost:3000/prendas");
      const data = await res.json();

      // IMPORTANTE:
      // opcionTela y opcionesColor te llegan como strings => hay que convertirlos en arrays
      const prendasProcesadas = data.map((p) => ({
        ...p,
        opcionTela: p.opcionTela ? p.opcionTela.split(",") : [],
        opcionesColor: p.opcionesColor ? p.opcionesColor.split(",") : []
      }));

      setPrendas(prendasProcesadas);
    } catch (err) {
      console.error("Error cargando prendas:", err);
    }
  };

  useEffect(() => {
    cargarPrendas();

    const actualizar = () => cargarPrendas();
    window.addEventListener("prendas-updated", actualizar);

    return () => window.removeEventListener("prendas-updated", actualizar);
  }, []);

  // Abrir modal
  const abrirPersonalizar = (prenda) => {
    setPrendaSeleccionada(prenda);
    setModalOpen(true);
  };

  // Confirmar modal = agregar al carrito
  const agregarAlCarrito = (item) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(item);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Producto personalizado agregado al carrito 😎🔥");
    setModalOpen(false);
  };

  return (
    <section className="seccion-prendas">
      <h2>Catálogo de Prendas</h2>

      <div className="prendas-grid">
        {prendas.map((p) => (
          <div key={p.ID_Prenda} className="prenda-card">
            {p.imagen && (
              <img
                src={`http://localhost:3000/${p.imagen}`}
                alt={p.Nombre}
                className="prenda-imagen"
              />
            )}

            <h3>{p.Nombre}</h3>
            <p>{p.Descripcion}</p>
            <p>Precio: ${p.precioBase}</p>
            <p>Tela: {p.opcionTela.join(", ")}</p>
            <p>Colores: {p.opcionesColor.join(", ")}</p>

            <button
              className="personalizar-btn"
              onClick={() => abrirPersonalizar(p)}
            >
              Personalizar 🧵✨
            </button>
          </div>
        ))}
      </div>

      <PersonalizarModal
        open={modalOpen}
        prenda={prendaSeleccionada}
        onClose={() => setModalOpen(false)}
        onConfirm={agregarAlCarrito}
      />
    </section>
  );
}
