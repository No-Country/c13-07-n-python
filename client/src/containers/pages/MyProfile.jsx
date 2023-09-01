import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../useAuthStore';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import '../../styles/MyProfile.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const MyProfile = () => {
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

    /* Variable de estado para permitir la escritura en los campos a editar */
    const [editing, setEditing] = useState(false);

    /* Desarrollo de la estructura y diseño del componente.
    Asignacion de objetos y propiedades*/
    return (
        <div className="contenedorperfil">
            <div className="imagenperfil">
                <img src="data:image/jpeg;base64,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" alt="imagenperfil" />
            </div>
            <h1>{userData.name} {userData.last_name}</h1>
            <div className='botonespefil'>
                <Button className='botoncarrito'>Carrito</Button>
                <Button className='botonfavoritos'>Favoritos</Button>
            </div>
            <div className="informacionperfil">
                <Form>
                    <Form.Group className='grupodatoperfil'>
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control
                            className='inputperfil'
                            type="text"
                            placeholder={userData.name}
                            value=""
                            disabled={!editing} />
                    </Form.Group>
                    <Form.Group className='grupodatoperfil'>
                        <Form.Label>Apellido:</Form.Label>
                        <Form.Control
                            className='inputperfil'
                            type="text"
                            placeholder={userData.last_name}
                            value=""
                            disabled={!editing} />
                    </Form.Group>
                    <Form.Group className='grupodatoperfil'>
                        <Form.Label>Correo electrónico:</Form.Label>
                        <Form.Control
                            className='inputperfil'
                            type="text"
                            placeholder={userData.email}
                            value=""
                            disabled={!editing} />
                    </Form.Group>
                    <Form.Group className='grupodatoperfil'>
                        <Form.Label>Cumpleaños:</Form.Label>
                        <Form.Control
                            className='inputperfil'
                            type="text"
                            placeholder={userData.birthday}
                            value=""
                            disabled={!editing} />
                    </Form.Group>
                </Form>
                <Button className='botoneditar' onClick={() => setEditing(true)}>Editar</Button>
            </div>
        </div>
    );
};

export default MyProfile;


