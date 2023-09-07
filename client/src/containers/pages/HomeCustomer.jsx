import React, { useState, useRef, useEffect } from 'react';
import '../../styles/HomeCustomer.css';

export default function HomeCustomer() {

    const elementos = [
        { id: 1, nombre: 'Sweater Vest', precio: 200, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0EAo2VjvZmCKYVQL-ErTnbogWCwu7M8AhBIvgyoGR0YKIc5BnBcx3HTqYYxuPitv79Wk&usqp=CAU', descripcion: 'Descripción del elemento 1' },
        { id: 2, nombre: 'Full zip sweater', precio: 200, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0EAo2VjvZmCKYVQL-ErTnbogWCwu7M8AhBIvgyoGR0YKIc5BnBcx3HTqYYxuPitv79Wk&usqp=CAU', descripcion: 'Descripción del elemento 2' },
        { id: 3, nombre: 'Full zip sweater', precio: 200, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0EAo2VjvZmCKYVQL-ErTnbogWCwu7M8AhBIvgyoGR0YKIc5BnBcx3HTqYYxuPitv79Wk&usqp=CAU', descripcion: 'Descripción del elemento 3' },
        { id: 4, nombre: 'Full zip sweater', precio: 200, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0EAo2VjvZmCKYVQL-ErTnbogWCwu7M8AhBIvgyoGR0YKIc5BnBcx3HTqYYxuPitv79Wk&usqp=CAU', descripcion: 'Descripción del elemento 4' },
    ];

    const elementoProductoRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(null);
    const [scrollLeft, setScrollLeft] = useState(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX);
        setScrollLeft(elementoProductoRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setStartX(null);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const x = e.pageX;
        const distance = x - startX;
        elementoProductoRef.current.scrollLeft = scrollLeft - distance;
    };

    const preventDragStart = (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado de arrastre de la imagen
    };


    return (
        <div className='contenedor-home'>
            <div className='imagen-home'>
                .
            </div>
            <div className='producto-destacado'>
                <div className='titulo-destacado'>PRODUCTOS MÁS DESTACADOS</div>

                <div className='subtitulo-destacado' >Mas populares</div>
                <div className='elemento-producto'
                    ref={elementoProductoRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseUp}
                >
                    {elementos.map((elemento) => (
                        <div key={elemento.id} className='producto-individual'>
                            <div className='imagen-producto'>
                                <img src={elemento.imagen} alt={elemento.nombre}
                                    onDragStart={preventDragStart} />                                <span>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                                        </svg>
                                    </button>
                                </span>
                            </div>
                            <div className='titulo-producto'>
                                {elemento.nombre}
                            </div>
                            <div className='precio-producto'>
                                ${elemento.precio}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='producto-categoria'>
                    <div className='titulo-destacado'>CATEGORIA</div>

                    <div className='subtitulo-destacado'>Mujeres</div>
                    <div className='elemento-producto'>
                        {elementos.map((elemento) => (
                            <div key={elemento.id} className='producto-individual'>
                                <div className='imagen-producto'>
                                    <img src={elemento.imagen} alt={elemento.nombre} />
                                    <span>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                                            </svg>
                                        </button>
                                    </span>
                                </div>
                                <div className='titulo-producto'>
                                    {elemento.nombre}
                                </div>
                                <div className='precio-producto'>
                                    ${elemento.precio}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='subtitulo-destacado'>Hombres</div>
                    <div className='elemento-producto'>
                        {elementos.map((elemento) => (
                            <div key={elemento.id} className='producto-individual'>
                                <div className='imagen-producto'>
                                    <img src={elemento.imagen} alt={elemento.nombre} />
                                    <span>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                                            </svg>
                                        </button>
                                    </span>
                                </div>
                                <div className='titulo-producto'>
                                    {elemento.nombre}
                                </div>
                                <div className='precio-producto'>
                                    ${elemento.precio}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='subtitulo-destacado'>Niños</div>
                    <div className='elemento-producto'>
                        {elementos.map((elemento) => (
                            <div key={elemento.id} className='producto-individual'>
                                <div className='imagen-producto'>
                                    <img src={elemento.imagen} alt={elemento.nombre} />
                                    <span>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                                            </svg>
                                        </button>
                                    </span>
                                </div>
                                <div className='titulo-producto'>
                                    {elemento.nombre}
                                </div>
                                <div className='precio-producto'>
                                    ${elemento.precio}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
