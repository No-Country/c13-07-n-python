
import { useState, useEffect } from 'react';

import { CoverImagen } from '../../components/ImagenPortada';
import { PiePagina } from '../../components/PiePagina';
import { Producto } from '../../components/Producto';
import products from '../../assets/Productos.json';
import '../../styles/Categorias.css'

export default function Categorias() {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        setProductos(products.products);
    }, []);

    const [categoriaFiltrada, setCategoriaFiltrada] = useState(null);
    const handleFiltrarCategoria = (categoria) => {
        setCategoriaFiltrada(categoria);
    };

    const sumaStockFiltrado = productos
        .filter((producto) => categoriaFiltrada === null || producto.category === categoriaFiltrada)
        .reduce((totalStock, producto) => totalStock + producto.stock, 0);

    const [precioMinimo, setPrecioMinimo] = useState('');
    const [precioMaximo, setPrecioMaximo] = useState('');
    const handleFiltrarPrecio = () => {
        const min = parseFloat(precioMinimo);
        const max = parseFloat(precioMaximo);

        const productosFiltrados = productos.filter((producto) =>
            (categoriaFiltrada === null || producto.category === categoriaFiltrada) &&
            (!isNaN(min) ? producto.price >= min : true) &&
            (!isNaN(max) ? producto.price <= max : true)
        );

        return productosFiltrados;
    };

    return (
        <div className='contenedor-categorias'>
            <CoverImagen />

            <h2 className='titulo-destacado'>CATEGORIAS</h2>

            <div className="botones-filtrar">
                <button onClick={() => handleFiltrarCategoria(null)}>Todos</button>
                <button onClick={() => handleFiltrarCategoria('Hombres')}>Hombres</button>
                <button onClick={() => handleFiltrarCategoria('Mujeres')}>Mujeres</button>
                <button onClick={() => handleFiltrarCategoria('Niños')}>Niños</button>
            </div>

            <h3 className='cantidad-filtrada'>{sumaStockFiltrado} Productos</h3>
            <div className='contenedor-agrupado'>
                <div className='filtros-productos'>
                    <input
                        type="number"
                        placeholder="Desde"
                        value={precioMinimo}
                        onChange={(e) => setPrecioMinimo(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Hasta"
                        value={precioMaximo}
                        onChange={(e) => setPrecioMaximo(e.target.value)}
                    />
                </div>
                <div className='contenedor-productos'>
                    {handleFiltrarPrecio()
                        .slice(0, 25)
                        .filter((producto) => categoriaFiltrada === null || producto.category === categoriaFiltrada)
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
            </div>

            <PiePagina />
        </div>
    )
}