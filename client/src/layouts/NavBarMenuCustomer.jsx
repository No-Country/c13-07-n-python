import { Link, Outlet } from "react-router-dom"
import '../styles/NavBarMenu.css'
import List_line from '../assets/Icons';
import { useState } from 'react';

const NavBarMenuGuess = () => {
  const [listaVisible, setListaVisible] = useState(false);
  const toggleLista = () => {
    setListaVisible(!listaVisible);
  };

  return (
    <div>
      <div className="contenedor-menu">
        <h2 className="titulo-menu"><Link className="enlace-lista" to="/home">OTOÑO</Link></h2>
        <input className="buscador-menu" type="text" placeholder="Buscar" />
        <ul className={`lista-menu ${listaVisible ? 'visible' : ''}`} id="listaMenu">
          <li className="elemento-lista"><Link className="enlace-lista" to="/categorias">Categorías</Link></li>
          <li className="elemento-lista"><Link className="enlace-lista" to="/mis-pedidos">Pedidos</Link></li>
          <li className="elemento-lista"><Link className="enlace-lista" to="/logout">Salir</Link></li>
        </ul>
        <button className="boton-desplegable" type="button" onClick={toggleLista}>
          <List_line />
        </button>
      </div>

      <section className="section-navBg"><Outlet /></section>

    </div>
  )
}

export default NavBarMenuGuess