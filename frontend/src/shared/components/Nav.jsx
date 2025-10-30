import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

function Nav() {
    return (
        <header className="nav-container">
            <div className="nav-top-banner">
                <p>12 cuotas sin interés a partir de los $300.000</p>
            </div>

            <div className="nav-main">
                <div className="nav-center">
                    <Link to="/"><h1 className="nav-logo">Skireldbs</h1></Link>
                </div>

                <div className="nav-menu-row">
                    <ul className="nav-links">
                        <li><a href="#">Best 2025</a></li>
                        <li><a href="#">Pedidos</a></li>
                        <li><a href="#">Locales</a></li>
                    </ul>

                    <div className="nav-icons">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <Link to="/user"><i className="fa-regular fa-user"></i></Link>
                        <Link to="/cart"><i className="fa-solid fa-cart-shopping"></i></Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Nav;
