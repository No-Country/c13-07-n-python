
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../useAuthStore'
import jwt_decode from 'jwt-decode'
import axios from 'axios';

const MyProfile = () => {
    const authStore = useAuthStore();
    const [userData, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const decodedToken = jwt_decode(authStore.accessToken);
            const userID = decodedToken.user_id;
    
            axios.get(`http://127.0.0.1:8000/core/get-user/${userID}`)
                .then(response => {
                    setData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error al obtener datos de la API:', error);
                    setLoading(false);
                });
        } catch (error) {
            console.error('Error al decodificar el token:', error.message);
            console.error('Stack de error:', error.stack);
            setLoading(false);
        }
    }, [authStore.accessToken]);

    return (
        <>
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
        </>
    );
};

export default MyProfile;
