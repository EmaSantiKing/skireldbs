import React from "react";
import "./nav.css";

function Nav() {
    return (
        <header className="nav-container">
            {/* Franja superior */}
            <div className="nav-top-banner">
                <p>12 cuotas sin interés a partir de los $300.000</p>
            </div>

            {/* Sección principal */}
            <div className="nav-main">
                <div className="nav-center">
                    <h1 className="nav-logo">Skireldbs</h1>
                </div>

                <div className="nav-menu-row">
                    <ul className="nav-links">
                        <li><a href="#">Best 2025</a></li>
                        <li><a href="#">Pedidos</a></li>
                        <li><a href="#">Locales</a></li>
                    </ul>

                    <div className="nav-icons">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <i className="fa-regular fa-user"></i>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Nav;
