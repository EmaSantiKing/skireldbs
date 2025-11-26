import { useEffect, useState } from "react";

export default function SeccionPrendas() {
  const [prendas, setPrendas] = useState([]);

  const cargarPrendas = async () => {
    try {
      const res = await fetch("http://localhost:3000/prendas");
      const data = await res.json();
      setPrendas(data);
    } catch (err) {
      console.error("Error cargando prendas:", err);
    }
  };

  useEffect(() => {
    // Carga inicial
    cargarPrendas();

    // Suscribirse al evento de actualización
    const actualizar = () => {
      cargarPrendas();
    };
    window.addEventListener("prendas-updated", actualizar);

    // Cleanup al desmontar
    return () => window.removeEventListener("prendas-updated", actualizar);
  }, []);

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
            <p>Tela: {p.opcionTela}</p>
            <p>Colores: {p.opcionesColor}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
