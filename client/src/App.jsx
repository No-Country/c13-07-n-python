import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar.jsx'
import Loggin from './components/Loggin';
import imagen1 from './assets/imagen1.png';
import Signup from './components/Signup';

function App() {

  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className='app-container'>
      <div className='nav-component'>
        <NavBar />
      </div>
      <div className='body-group'>
        <div className='signup-container'>
          {showLogin ? <Loggin /> : <Signup />}
          <div className='question2'>
        {showLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
        <span>
          <a href='#' onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? 'Regístrate' : 'Inicia sesión'}
          </a>
        </span>
      </div>
        </div>
        <div className='img-container'>
          <img img src={imagen1} alt="imagen 1" />
        </div>
      </div>
      
    </div>
  );
}

export default App;
