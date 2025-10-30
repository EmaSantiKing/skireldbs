import React from "react";
import Option from "./Option";
import "./panel.css";

const options = [
  {
    link: "info",
    title: "Información de tu perfil",
    description: "Datos personales y de tu cuenta",
  },
  {
    link: "",
    title: "Tarjetas",
    description: "Tarjetas guardadas en tu cuenta",
  },
  {
        link: "",

    title: "Notificaciones",
    description: "Elige el tipo de notificaciones que quieres recibir",
  },
  {
        link: "",

    title: "Seguridad",
    description: "Configuración de la seguridad de tu cuenta",
  },
  {
    link: "",
    title: "Direcciones",
    description: "Direcciones guardadas en tu cuenta",
  },
  {
    link: "",
    title: "Colaboradores",
    description: "Personas que operan en tu cuenta",
  },
  {
    link: "",
    title: "Privacidad",
    description: "Preferencias y control sobre el uso de tus datos",
  },
];

export default function Panel() {
  return (
    <div className="user-panel">
      {options.map((opt, i) => (
        <Option key={i} {...opt} />
      ))}
    </div>
  );
}
