import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

function Nav() {
    return (
        <header className="nav-container">
            {/* Banner superior */}
            <div className="nav-top-banner">
                <p>12 cuotas sin interés a partir de los $300.000</p>
            </div>

            {/* Contenido principal */}
            <div className="nav-main">
                
                {/* Logo */}
                <div className="nav-center">
                    <Link to="/">
                        <h1 className="nav-logo">Skireldbs</h1>
                    </Link>
                </div>

                {/* Menú + íconos */}
                <div className="nav-menu-row">

                    {/* LINKS DEL MENÚ */}
                    <ul className="nav-links">
                        <li><Link to="/">Best 2025</Link></li>
                        <li><Link to="/pedidos">Pedidos</Link></li>
                        <li><Link to="/locales">Locales</Link></li>
                    </ul>

                    {/* ICONOS DERECHA */}
                    <div className="nav-icons">
                        <i className="fa-solid fa-magnifying-glass"></i>

                        <Link to="/user">
                            <i className="fa-regular fa-user"></i>
                        </Link>

                        <Link to="/cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Nav;
