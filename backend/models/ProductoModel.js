const db = require('../config/db');

// Tabla para guardar palas, cajas de bolas, ropa...
const crearTablaProductos = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS productos (
            id SERIAL PRIMARY KEY,
            categoria VARCHAR(50) NOT NULL, -- ej: 'palas', 'zapatillas'
            nombre VARCHAR(100) NOT NULL,
            descripcion TEXT,
            precio DECIMAL(10,2) NOT NULL,
            imagen_url VARCHAR(255),
            stock INTEGER DEFAULT 10
        );
    `;
    try {
        await db.query(query);
        console.log('✅ Tabla "productos" (La Tienda) lista.');
    } catch (error) {
        console.error('❌ Error creando tabla tienda:', error);
    }
};

// Función para poblar la tienda la primera vez si está vacía
const sembrarInventario = async () => {
    const comprobar = await db.query('SELECT COUNT(*) FROM productos');
    if (parseInt(comprobar.rows[0].count) === 0) {
        console.log("🌱 La tienda está vacía. Añadiendo stock inicial de prueba...");
        const inserts = `
            INSERT INTO productos (categoria, nombre, descripcion, precio, imagen_url) VALUES 
            ('pala', 'Pala Babolat Technical Viper', 'Potencia extrema para rematadores 2024', 280.00, 'babolat.jpg'),
            ('pala', 'Pala Nox AT10 Genius', 'La pala de Agustín Tapia. Control y precisión', 249.99, 'nox.jpg'),
            ('zapatillas', 'Asics Padel Lima', 'Máxima durabilidad en pistas de arena', 85.50, 'asics.jpg'),
            ('accesorio', 'Caja Bolas Head Padel Pro', 'Bote de 3 pelotas de tacto rápido', 6.00, 'pelotas.jpg');
        `;
        await db.query(inserts);
    }
};

// Función para pedirle el menú a la Base de Datos
const obtenerTodosLosProductos = async () => {
    const result = await db.query('SELECT * FROM productos');
    return result.rows;
};

module.exports = { crearTablaProductos, sembrarInventario, obtenerTodosLosProductos };