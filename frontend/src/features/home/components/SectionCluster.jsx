import React from "react";
import "./cluster-section.css";

const clusters = [
  {
    title: "Sastrería",
    description:
      "Siluetas icónicas MKV, renovadas con una sensibilidad veraniega relajada, elevada y un estilo único.",
    image: "/assets/cluster-1.jpg",
  },
  {
    title: "Sets",
    description:
      "Con posibilidades infinitas para combinar por separado, descubrí a las estrellas del verano.",
    image: "/assets/cluster-2.jpg",
  },
  {
    title: "Vestidos",
    description:
      "Piezas ganadoras que se proclaman como soluciones estilísticas fáciles y modernas.",
    image: "/assets/cluster-3.jpg",
  },
];

export default function SectionCluster() {
  return (
    <section className="cluster-section">
      <h2 className="cluster-title">Summer Collection</h2>
      <div className="cluster-grid">
        {clusters.map((item, index) => (
          <div key={index} className="cluster-item">
            <img src={item.image} alt={item.title} className="cluster-image" />
            <h3 className="cluster-subtitle">{item.title}</h3>
            <p className="cluster-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
