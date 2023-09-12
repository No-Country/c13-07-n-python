import { useState, useEffect } from 'react';
import { CoverImagen } from '../../components/ImagenPortada';
import { PiePagina } from '../../components/PiePagina';
import { Producto } from '../../components/Producto';
import products from '../../assets/Productos.json';
import '../../styles/HomeCustomer.css';

export default function HomeCustomer() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        setProductos(products.products);
    }, []);

    const renderizarProductoPorCategoria = (category) => {
        return productos
            .filter((producto) => producto.category === category)
            .slice(0, 5)
            .map((producto) => (
                <Producto
                    key={producto.id}
                    imagen={producto.img}
                    nombre={producto.name}
                    precio={producto.price}
                />
            ));
    };

    return (
        <div className='contenedor-home'>
            <CoverImagen />
            <h2 className='titulo-destacado'>PRODUCTOS MÁS DESTACADOS</h2>
            <div className='contenedor-productos'>{renderizarProductoPorCategoria('Mujeres')}</div>
            <h3 className='subtitulo-destacado'>Mujeres</h3>
            <div className='contenedor-productos'>{renderizarProductoPorCategoria('Mujeres')}</div>
            <h2 className='titulo-destacado'>CATEGORIA</h2>
            <h3 className='subtitulo-destacado'>Hombres</h3>
            <div className='contenedor-productos'>{renderizarProductoPorCategoria('Hombres')}</div>
            <h3 className='subtitulo-niños'>Niños</h3>
            <div className='contenedor-productos'>{renderizarProductoPorCategoria('Niños')}</div>
            <PiePagina />
        </div>
    );
}
