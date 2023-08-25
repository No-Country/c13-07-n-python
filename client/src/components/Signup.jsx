import React from 'react';
import './InputGroup.css';
import InputGroup from './InputGroup.jsx'
import EmailIcon from '../assets/EmailIcon.svg'

const Signup = () => {
  return (
    <div className='singup-componente'>
      <h2>Registrate</h2>
      <div className='contenido'>
        <InputGroup
          title='Nombre completo'
          type='text'
          placeholder='david@example.com'
          icon={EmailIcon}
        />
        <InputGroup
          title='Email'
          type='text'
          placeholder='david@example.com'
          icon={EmailIcon}
        />
        <InputGroup
          title='Direccion'
          type='text'
          placeholder='ul.Sniegowa 80, Bydgoszcz 85-466'
          icon={EmailIcon}
        />
        <InputGroup
          title='Codigo postal'
          type='text'
          placeholder='242435'
          icon={EmailIcon}
        />
        <InputGroup
          title='Fecha de Nacimiento'
          type='text'
          placeholder='dd / mm / aaaa'
          icon={EmailIcon}
        />
        <InputGroup
          title='Celular'
          type='text'
          placeholder='+51 999 999 999'
          icon={EmailIcon}
        />
      </div>
      <div className='button-group'>
        <a href='homes'>
          <button>Iniciar Sesión</button>
        </a>
      </div>
    </div>
  );
};

export default Signup;
