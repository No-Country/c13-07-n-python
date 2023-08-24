import React from 'react';
import './App.css';
import NavBar from './components/NavBar.jsx'
import Loggin from './components/Loggin';
import imagen1 from './assets/imagen1.png';

function App() {
  return (
    <div className='app-container'>
      <div className='nav-component'>
        <NavBar />
      </div>
      <div className='loggin-group'>
        <div className='loggin-component'>
          <Loggin />
        </div>
        <div className='img-element'>
          <img img src={imagen1} alt="imagen 1" />
        </div>
      </div>
    </div>
  );
}

export default App;
