import React, { useState } from 'react';
import '../../styles/HomeCustomer.css';

export default function HomeCustomer() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();  //para que no se refresque la pagina
        console.log('Realizar búsqueda:', searchQuery);
    };

    return (
        <>
            <div className="contenedorhome">
                <div className="bloquebuscador">
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="barradebusqueda"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button type="submit" className="boton-buscar">Buscar</button>
                    </form>
                </div>
                <div className="bloqueimagen">
                    <img className="imagenportada" src="https://images.vexels.com/media/users/3/194698/raw/34d9aa618f832510ce7290b4f183484a-comprar-plantilla-de-control-deslizante-en-linea.jpg" alt="imagendeportada" />
                </div>
            </div>
        </>
    );
}
