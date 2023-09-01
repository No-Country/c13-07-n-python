import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../useAuthStore';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const MyProfile = () => {
    /* El código utiliza el enlace `useAuthStore` para obtener 
    el almacén de autenticación del contexto.*/
    const authStore = useAuthStore();
    /*inicializa dos variables de estado `userData` usando el gancho `useState`.*/
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

    /* Desarrollo de la estructura y diseño del componente.
    Asignacion de objetos y propiedades*/
    return (
        <div className="contenedorperfil">
            <div className="informacionusuario">
                <h1>Nombre de Usuario</h1>
                <p><strong>Nombre:</strong> {userData.name}</p>
                <p><strong>Apellido:</strong> {userData.last_name}</p>
                <p><strong>Correo electrónico:</strong> {userData.email}</p>
                <p><strong>Cumpleaños:</strong> {userData.birthday}</p>
            </div>
            <div className="imagenusuario">
                {/*<img src={userData.imagenURL} alt="imagenperfil" />*/}
            </div>
        </div>
    );
};

export default MyProfile;


