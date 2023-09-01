import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/MyProfile.css';

//aca voy a hacer la conexion con la api para obtener los datos y poder modificarlos
/*
useEffect(() => {
    axios.get('http://127.0.0.1:8000/core/get-user/')
        .then(response => {
            setUserData(response.data);
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
}, []);
*/

export default function MyProfile() {
//esto lo puse temporalmente, planeo combinarlo con la solicitud get a la api
    const [userData] = useState({
        nombre: 'Nombre del Usuario',
        apellido: 'Apellido del Usuario',
        correo: 'example@example.com',
        cumpleanos: '01 de enero de 1990',
        contrasena: '********',
        imagenURL: 'https://cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/7XKUVIER6JFZDGODBA42HUFTBQ.jpg'
    });

    return (
        <>
            <div className="contenedorperfil">
                <div className="informacionusuario">
                    <h1>Nombre de Usuario</h1>
                    <p><strong>Nombre:</strong> {userData.nombre}</p>
                    <p><strong>Apellido:</strong> {userData.apellido}</p>
                    <p><strong>Correo electrónico:</strong> {userData.correo}</p>
                    <p><strong>Cumpleaños:</strong> {userData.cumpleanos}</p>
                    <p><strong>Contraseña:</strong> {userData.contrasena}</p>
                </div>
                <div className="imagenusuario">
                    <img src={userData.imagenURL} alt="imagenperfil" />
                </div>
            </div>
        </>
    );
}
