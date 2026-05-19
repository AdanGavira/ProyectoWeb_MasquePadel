const db = require('../config/db');

// Función que crea la tabla Partidos si no existe
const crearTablaPartidos = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS partidos (
            id SERIAL PRIMARY KEY,
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            jugador1_id INTEGER REFERENCES usuarios(id),
            jugador2_id INTEGER REFERENCES usuarios(id),
            jugador3_id INTEGER REFERENCES usuarios(id),
            jugador4_id INTEGER REFERENCES usuarios(id),
            resultado VARCHAR(100),
            estado VARCHAR(20) DEFAULT 'en_curso'
        );
    `;
    try {
        await db.query(query);
        console.log('✅ Tabla "partidos" lista.');
        // AÑADIMOS LA TABLA PUNTOS
        const queryPuntos = `
            CREATE TABLE IF NOT EXISTS puntos (
                id SERIAL PRIMARY KEY,
                partido_id INTEGER REFERENCES partidos(id),
                jugador_id INTEGER REFERENCES usuarios(id),
                tipo_jugada VARCHAR(50), 
                set_numero INTEGER,
                juego_numero INTEGER,
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        try {
            await db.query(queryPuntos);
            console.log('✅ Tabla "puntos" lista.');
        } catch (error) {
            console.error('❌ Error creando tabla puntos:', error);
        }
    } catch (error) {
        console.error('❌ Error creando tabla partidos:', error);
    }
};

// Función para registrar el inicio de un partido
const crearPartido = async (j1, j2, j3, j4) => {
    const query = `
        INSERT INTO partidos (jugador1_id, jugador2_id, jugador3_id, jugador4_id) 
        VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const values = [j1, j2, j3, j4];
    const result = await db.query(query, values);
    return result.rows[0]; 
};

// Añade esta función antes del module.exports
const registrarPunto = async (partido_id, jugador_id, tipo_jugada, set_num, juego_num) => {
    const query = `
        INSERT INTO puntos (partido_id, jugador_id, tipo_jugada, set_numero, juego_numero) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const values = [partido_id, jugador_id, tipo_jugada, set_num, juego_num];
    const result = await db.query(query, values);
    return result.rows[0]; 
};

// No olvides exportar la nueva función
module.exports = {
    crearTablaPartidos,
    crearPartido,
    registrarPunto 
};