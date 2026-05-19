const { Pool } = require('pg');

// Creamos la conexión usando las variables de entorno de Docker
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'admin_padel',
    password: process.env.DB_PASSWORD || 'padel_secreto',
    database: process.env.DB_NAME || 'masquepadel_db'
});

// Probamos que la conexión funciona
pool.connect()
    .then(() => console.log('🔥 Conectado a la Base de Datos PostgreSQL con éxito'))
    .catch(err => console.error('❌ Error conectando a la BD:', err));

module.exports = pool;