import { useEffect, useState } from "react";
import "./prendas-section.css";

export default function PrendasSection() {
    const [prendas, setPrendas] = useState([]);

    useEffect(() => {
        const fetchPrendas = async () => {
            try {
                const res = await fetch("http://localhost:3000/prendas");
                const data = await res.json();
                setPrendas(data);
            } catch (err) {
                console.error("Error cargando prendas:", err);
            }
        };

        fetchPrendas();
    }, []);

    return (
        <section className="prendas-section">
            <h2 className="titulo-prendas">Nuevas prendas</h2>

            <div className="grid-prendas">
                {prendas.map((p) => (
                    <div key={p.ID_Prenda} className="card-prenda">

                        <div className="img-container">
                            {p.imagen ? (
                                <img 
                                    src={`http://localhost:3000/uploads/${p.imagen}`} 
                                    alt={p.Nombre} 
                                />
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

                        <button className="btn-detalle">Ver detalle</button>
                    </div>
                ))}
            </div>
        </section>
    );
}
