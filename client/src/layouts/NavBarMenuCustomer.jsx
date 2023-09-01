import { Link, Outlet } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
//import logo from '../assets/logo1.png';
import '../styles/NavBarMenu.css'

const NavBarMenuCustomer = () => {
  return (
    <div>
      <div className="navbar navbar-expand-lg navBg">
            <div className="container-fluid">
            <h1>OTOÑO</h1>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                  
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Nav.Link as={Link} to='/' className="nav-link text-black navbar-link" href="#">Home Customer</Nav.Link>
                  </li>
                  <li className="nav-item">
                    <Nav.Link as={Link} to='/nosotros' className="nav-link text-black navbar-link" href="#">Nosotros</Nav.Link>
                  </li>
                  <li className="nav-item">
                    <Nav.Link as={Link} to='/reviews' className="nav-link text-black navbar-link" href="#">Reviews</Nav.Link>
                  </li>
                  <li className="nav-item">
                    <Nav.Link as={Link} to='/categorias' className="nav-link text-black navbar-link" href="#">Categorías</Nav.Link>
                  </li>
                  { <li className="nav-item">
                    <Nav.Link as={Link} to='/mi-perfil' className="nav-link text-black navbar-link" href="#">Mi perfil</Nav.Link>
                  </li> }
                  <li className="nav-item">
                    <Nav.Link as={Link} to='/logout' className="nav-link text-black dark-focus navbar-link" aria-current="page">Salir</Nav.Link>
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

export default NavBarMenuCustomer