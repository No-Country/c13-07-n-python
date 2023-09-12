import "../styles/NavBarMenu.css";
import { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import List_line from '../assets/Icons';

export default function NavBarMenuGuest() {
  const [listaVisible, setListaVisible] = useState(false);
  const toggleLista = () => {
    setListaVisible(!listaVisible);
  };

  return (
    <div className="contenedor-menu">
      <h2 className="titulo-menu"><Link className="enlace-lista" to="/">OTOÑO</Link></h2>
      <input className="buscador-menu" type="text" placeholder="Buscar" />
      <ul className={`lista-menu ${listaVisible ? 'visible' : ''}`} id="listaMenu">
        <li className="elemento-lista"><Link className="enlace-lista" to="/categorias">Categorías</Link></li>
        <li className="elemento-lista"><Link className="enlace-lista" to="/mis-pedidos">Pedidos</Link></li>
        <li className="elemento-lista"><Link className="enlace-lista" to="/registrarme">Regístrate</Link></li>
      </ul>
      <button className="boton-desplegable" type="button" onClick={toggleLista}>
        <List_line />
      </button>
      <section className="section-navBg"><Outlet /></section>
    </div>
  );
}