//            Global
import React, { useState, useEffect } from 'react';

//            servicios
import { useAuthStore } from '../../useAuthStore';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

//            estructura y diseño
import '../../styles/MyProfile.css'

const MyProfile = () => {

    ///////////////////////////////////////////////////////////////////////
    //////             OBTENER INFORMACION DEL USUARIO              ///////
    ///////////////////////////////////////////////////////////////////////

    /* El código utiliza el enlace `useAuthStore` para obtener 
    el almacén de autenticación del contexto.*/
    const authStore = useAuthStore();
    /* Variable de estado para mostrar los datos del usuario, recibidas de la solicitud */
    const [userData, setData] = useState({});

    useEffect(() => {
        try {
            /* está decodificando el `accessToken` almacenado en `authStore` 
            usando la función `jwt_decode`. 
            Luego recupera la propiedad `user_id` del token decodificado y 
            la asigna a la variable `userID`. Este `ID de usuario` se utiliza para 
            realizar una solicitud a la API para recuperar los datos del usuario. */
            const userID = jwt_decode(authStore.accessToken).user_id;

            /* El código realiza una solicitud HTTP GET a la URL.
             Está utilizando la biblioteca `axios` para enviar la solicitud. */
            axios.get(`http://127.0.0.1:8000/core/get-user/${userID}`)
                .then(response => {
                    setData(response.data);
                })
                /* Maneja los errores durante la solicitud de API */
                .catch(error => {
                    console.error('Error al obtener datos de la API:', error);
                });
        } /* Maneja los errores durante la decodificacion del token */
        catch (error) {
            console.error('Error al decodificar el token:', error.message);
            console.error('Stack de error:', error.stack);
        }
        /* Especifica las dependencias para que se ejecute el efecto. 
        En este caso, el efecto se ejecutará solo una vez */
    }, []);

    ///////////////////////////////////////////////////////////////////////
    //////            EDITAR LA INFORMACION DEL USUARIO             ///////
    ///////////////////////////////////////////////////////////////////////

    /* Variable de estado para permitir la escritura en los campos a editar */
    const [editing, setEditing] = useState(false);



    ///////////////////////////////////////////////////////////////////////
    //////            MOSTRAR LA INFORMACION DEL USUARIO            ///////
    ///////////////////////////////////////////////////////////////////////

    /* Desarrollo de la estructura y diseño del componente.
    Asignacion de objetos y propiedades*/
    return (
        <div className='contenedor-perfil-0'>
            <div className='contenedor-perfil-1'>
                <img className='imagen-perfil' src='https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos.jpg' alt='imagen-perfil-usuario' />
                <label className='nombre-perfil'>{userData.name} {userData.last_name}</label>
            </div>
            <div className='contenedor-perfil-2'>
                <button className='boton-perfil-0'>Carrito</button>
                <button className='boton-perfil-0'>Favoritos</button>
            </div>
            <div className='contenedor-perfil-3'>
                <div className='contenedor-entrada-generica'>
                    <div className='titulo-entrada-generica'>
                        Email:
                    </div>
                    <div className='entrada-generica'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                            </svg>
                        </span>
                        <input
                            placeholder={userData.email}
                            disabled={!editing}
                        />
                    </div>
                </div>
                <div className='contenedor-entrada-generica'>
                    <div className='titulo-entrada-generica'>
                        Direccion:
                    </div>
                    <div className='entrada-generica'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                            </svg>
                        </span>
                        <input
                            disabled={!editing}
                        />
                    </div>
                </div>
                <div className='contenedor-entrada-generica'>
                    <div className='titulo-entrada-generica'>
                        Codigo Postal:
                    </div>
                    <div className='entrada-generica'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                            </svg>
                        </span>
                        <input
                            disabled={!editing}
                        />
                    </div>
                </div>
                <div className='contenedor-entrada-generica'>
                    <div className='titulo-entrada-generica'>
                        Fecha de nacimiento:
                    </div>
                    <div className='entrada-generica'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-date-fill" viewBox="0 0 16 16">
                                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z" />
                            </svg>
                        </span>
                        <input
                            placeholder={userData.birthday}
                            disabled={!editing}
                        />
                    </div>
                </div>
                <div className='contenedor-entrada-generica'>
                    <div className='titulo-entrada-generica'>
                        Telefono:
                    </div>
                    <div className='entrada-generica'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                            </svg>
                        </span>
                        <input
                            disabled={!editing}
                        />
                    </div>
                </div>
                <div className='contenedor-entrada-generica'>
                    <div className='titulo-entrada-generica'>
                        Contraseña:
                    </div>
                    <div className='entrada-generica'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg>
                        </span>
                        <input
                            disabled={!editing}
                        />
                    </div>
                </div>
            </div>
            <div className='contenedor-perfil-4'>
                {editing ? (
                    <button className='boton-perfil-1' onClick={() => setEditing(false)}>Guardar</button>
                ) : (
                    <button className='boton-perfil-1' onClick={() => setEditing(true)}>Editar</button>
                )}
            </div>
        </div>
    );
};

export default MyProfile;

