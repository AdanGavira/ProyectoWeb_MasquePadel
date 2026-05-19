const db = require('../config/db');

// Función que crea la tabla si no existe
const crearTablaUsuarios = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS usuarios (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            rol VARCHAR(50) DEFAULT 'jugador',
            fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        await db.query(query);
        console.log('✅ Tabla "usuarios" lista en la base de datos.');
    } catch (error) {
        console.error('❌ Error creando la tabla usuarios:', error);
    }
};

// Función para insertar un usuario en la tabla
const crearUsuario = async (nombre, email, password) => {
    const query = 'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [nombre, email, password];

    // Ejecutamos la consulta y devolvemos el resultado
    const result = await db.query(query, values);
    return result.rows[0]; 
};

// Función para buscar si el usuario existe para hacer login
const buscarUsuarioPorEmail = async (email) => {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0]; // Devuelve el usuario si existe, o undefined si no
};

module.exports = {
    crearTablaUsuarios,
    crearUsuario,
    buscarUsuarioPorEmail // <- No olvides exportarla aquí también
};
