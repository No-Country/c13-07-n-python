import React from 'react';
import logo from '../assets/logo1.png';
import './NavBar.css'

const NavigationMenu = () => {
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="menu">
        <li><a href="/">Home</a></li>
        <li><a href="/acerca">Nosotros</a></li>
        <li><a href="/servicios">Reviews</a></li>
        <li><a href="/contacto">Categoria</a></li>
        <li><a href="/contacto">Regístrate</a></li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
