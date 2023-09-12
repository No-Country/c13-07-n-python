
import { useState, useEffect } from 'react';

import { CoverImagen } from '../../components/ImagenPortada';
import { PiePagina } from '../../components/PiePagina';
import { Producto } from '../../components/Producto';
import products from '../../assets/Productos.json';
import '../../styles/HomeCustomer.css';
import '../../assets/Icons.jsx'

export default function HomeCustomer() {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        setProductos(products.products);
    }, []);

    return (
        <div className='contenedor-home'>
            <CoverImagen />
            <h2 className='titulo-destacado'>PRODUCTOS MÁS DESTACADOS</h2>
            <div className='contenedor-productos'>
                {productos
                    .slice(0, 5)
                    .map((producto) => (
                        <Producto
                            key={producto.id}
                            imagen={producto.img}
                            nombre={producto.name}
                            precio={producto.price}
                        />
                    )
                    )
                }
            </div>

            <h3 className='subtitulo-destacado'>Mujeres</h3>
            <div className='contenedor-productos'>
                {productos
                    .filter((productos) => productos.category == 'Mujeres')
                    .slice(0, 5)
                    .map((producto) => (
                        <Producto
                            key={producto.id}
                            imagen={producto.img}
                            nombre={producto.name}
                            precio={producto.price}
                        />
                    )
                    )
                }
            </div>

            <h2 className='titulo-destacado'>CATEGORIA</h2>
            <h3 className='subtitulo-destacado'>Hombres</h3>
            <div className='contenedor-productos'>
                {productos
                    .filter((productos) => productos.category == 'Hombres')
                    .slice(0, 5)
                    .map((producto) => (
                        <Producto
                            key={producto.id}
                            imagen={producto.img}
                            nombre={producto.name}
                            precio={producto.price}
                        />
                    )
                    )
                }
            </div>

            <h3 className='subtitulo-niños'>Niños</h3>
            <div className='contenedor-productos'>
                {productos
                    .filter((productos) => productos.category == 'Niños')
                    .slice(0, 5)
                    .map((producto) => (
                        <Producto
                            key={producto.id}
                            imagen={producto.img}
                            nombre={producto.name}
                            precio={producto.price}
                        />
                    )
                    )
                }
            </div>
            <PiePagina />
        </div>
    )
}



