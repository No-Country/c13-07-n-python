import React, { useState } from 'react';
import EyeIcon from '../assets/EyeIcon.svg';
import EmailIcon from '../assets/EmailIcon.svg';
import './loggin.css';

//aca voy a hacer el componente de para el inicio de sesion de la pagina register
function Loggin() {
    //aca voy a generar las constantes para enganchar las entradas desde el input en html
    //para este componente va a se email y contraseña por el momento
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //esto lo sume para me muestre los mensajes en la pagina.
    const [statusMessage, setStatusMessage] = useState('');

    //aca voy a realizar la conexion con la api, envio parametros y recibo respuesta. metodo POST
    const handleLoggin = async () => {
        try {
            //aca voy a intentar simular la coneccion con una api
            //probe la conexcion con django api rest, funciono con esta direccion: http://127.0.0.1:8000/tasks/
            //encontre otra api para simular la coneccion: https://reqres.in/api/login
            //las credenciales que maneja esta api son las siguientes:
            // eve.holt@reqres.in  => email con el que corroboro la consulta
            // cityslicka   => contraseña con la que corroboro la consulta
            //estaria bueno hacer la conexion con la api de django y los modelos que hayan definido.
            //tengo que pedir la direccion y los parametros del JSON.
            const response = await fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    //esta es la cajita donde se cargan los datos en formato JSON
                    'Content-Type': 'application/json',
                },
                //estos son los parametros que envio a la cajita.
                body: JSON.stringify({ email, password }),
            });

            //esto es para que los mensajes se ejecuten despues de haber recibido las respuesta de la solicitud
            const responseData = await response.json();

            //aca defino las condiciones de respuesta, (realizado, no realizado, error conexion) 
            if (response.ok) {
                //setStatusMessage('realizado');
                setStatusMessage('Inicio de sesión exitoso');
            } else {
                //setStatusMessage('no realizado');
                setStatusMessage('Inicio de sesión fallido');
            }
            //esta parte es para la conecion con la api, los errores que pueda tener depende la direccion.
            //por ejemplo para django tuve que cambiar ...localhost a ...https://127.0.0....
        } catch (error) {
            //setStatusMessage('error conexion');
            setStatusMessage('Hubo un error al intentar iniciar sesión.');
        }
    };

    //aca le voy a definir la estructura html intentando seguir los diseños que compartieron en el grupo
    return (
        <section className="loggin-box">
            <h1>Inicia Sesión</h1>
            {statusMessage && <p className={`status-message ${statusMessage.includes('exitoso') ? 'success' : 'error'}`}>{statusMessage}</p>}
            <div className="input-group">
                <h2>Email</h2>
                <input type="text" placeholder="david@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <span><img src={EmailIcon} alt="Mail Icon" /></span>
            </div>
            <div className="input-group">
                <h2>Contraseña</h2>
                <input type="password" placeholder="*********" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span><img src={EyeIcon} alt="Eye Icon" /></span>
            </div>
            <div className='question1'>
                <a href="##">¿Olvidaste la contraseña?</a>
            </div>
            <div className='button-group'>
                <button onClick={handleLoggin}>Iniciar Sesión</button>
            </div>
            <div className='question2'>
                ¿No tienes cuenta?
                <span>
                    <a href='##'>Regístrate</a>
                </span>
            </div>
        </section>
    );
}

export default Loggin;
