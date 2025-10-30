import React from "react";
import "./option.css";
import { Link } from "react-router-dom";

export default function Option({ title, description, link }) {
<<<<<<< HEAD
  const linked = "/user/" + link;

  return (
    <Link to={linked} className="option-card">
=======
  if(!link) link = "";
  const linked = "/user/" + {link};

  return (
    <Link to={{linked}} className="option-card">
>>>>>>> 099424e5f4c2e59040fa18452934190db6fe5421
      <h3 className="option-title">{title}</h3>
      <p className="option-description">{description}</p>
    </Link>
  );
}
