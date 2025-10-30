import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Columna 1: Shoply */}
        <div className="footer-column">
          <h3>Shoply</h3>
          <p>Se la primera en enterarte</p>

          <div className="footer-input">
            <input type="email" placeholder="Ingresá tu mail" />
            <span className="footer-send">Enviar</span>
          </div>
        </div>

        {/* Columna 2: Sobre Shoply */}
        <div className="footer-column">
          <h3>Sobre Shoply</h3>
          <p>
            Conocé la historia de la marca <a href="#">acá</a>
          </p>
          <p>Seguinos en nuestras redes:</p>
          <div className="footer-socials">
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-tiktok"></i>
          </div>
        </div>

        {/* Columna 3: Contacto */}
        <div className="footer-column">
          <h3>Contacto</h3>
          <p><i className="fa-regular fa-envelope"></i> Escribinos</p>
          <p><i className="fa-solid fa-phone"></i> +54 11 9 8532-5231</p>
          <p><i className="fa-solid fa-location-dot"></i> Locales</p>
          <p><i className="fa-solid fa-box-open"></i> Cancelar pedido</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
