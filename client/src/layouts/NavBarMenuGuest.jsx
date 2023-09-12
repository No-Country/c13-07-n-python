import { Link, Outlet } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import '../styles/NavBarMenu.css'

const NavBarMenuGuest = () => {
  return (

    <div>
      <div className="navbar navbar-expand-lg navBg">
        <div className="container-fluid">
          <h2 className="titulo-logo">OTOÑO</h2>
          <input className="buscador-home" type="text" />
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Nav.Link as={Link} to='/' className="nav-link text-black navbar-link" href="#">Home</Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link as={Link} to='/categorias' className="nav-link text-black navbar-link" href="#">Categorías</Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link as={Link} to='/ver-perfil' className="nav-link text-black navbar-link" aria-current="page">Mi perfil</Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link as={Link} to='/registrarme' className="nav-link text-black dark-focus navbar-link" aria-current="page">Registrate</Nav.Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <section className='section-navBg'>
        <Outlet></Outlet>
      </section>

    </div>
  )
}

export default NavBarMenuGuest