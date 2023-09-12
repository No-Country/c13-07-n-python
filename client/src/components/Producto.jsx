import PropTypes from 'prop-types';
import '../styles/Producto.css'

export const Producto = ({ imagen, nombre, precio }) => {
    return (
        <div className="contenedor-producto">
            <header>
                <img src={imagen} alt={nombre} />
            </header>
            <h2>{nombre}</h2>
            <h3>${precio}</h3>
        </div>
    );
}

Producto.propTypes = {
    imagen: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
};