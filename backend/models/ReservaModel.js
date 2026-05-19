const db = require('../config/db');

// Creamos la tabla Reservas
const crearTablaReservas = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS reservas (
            id SERIAL PRIMARY KEY,
            usuario_id INTEGER REFERENCES usuarios(id),
            pista_numero INTEGER NOT NULL,
            fecha DATE NOT NULL,
            hora VARCHAR(5) NOT NULL,
            creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(pista_numero, fecha, hora) -- ¡Magia! Evita que dos personas reserven la misma pista a la misma hora
        );
    `;
    try {
        await db.query(query);
        console.log('✅ Tabla "reservas" lista.');
    } catch (error) {
        console.error('❌ Error creando tabla reservas:', error);
    }
};

// Función para comprobar qué horas están pilladas en un día
const obtenerReservasPorDia = async (fecha) => {
    const query = 'SELECT pista_numero, hora FROM reservas WHERE fecha = $1';
    const result = await db.query(query, [fecha]);
    return result.rows;
};

// Función para confirmar una reserva
const crearReserva = async (usuario_id, pista_numero, fecha, hora) => {
    const query = `
        INSERT INTO reservas (usuario_id, pista_numero, fecha, hora) 
        VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const result = await db.query(query, [usuario_id, pista_numero, fecha, hora]);
    return result.rows[0];
};

module.exports = { crearTablaReservas, obtenerReservasPorDia, crearReserva };