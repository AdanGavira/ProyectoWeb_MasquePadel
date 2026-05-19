const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const UsuarioModel = require('./models/UsuarioModel');
const usuarioRoutes = require('./routes/usuarioRoutes');
const PartidoModel = require('./models/PartidoModel');
const partidoRoutes = require('./routes/partidoRoutes');

const ReservaModel = require('./models/ReservaModel');
const reservaRoutes = require('./routes/reservaRoutes');

const ProductoModel = require('./models/ProductoModel');
const productoRoutes = require('./routes/productoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// A CONTINUACIÓN EL CAMBIO CLAVE: Esperamos en TANDEM
// ----------------------------------------------------
const inicializarBaseDatos = async () => {
    try {
        // ... (las otras llamadas)
        await PartidoModel.crearTablaPartidos();
        await ReservaModel.crearTablaReservas();

        await ProductoModel.crearTablaProductos(); 
        await ProductoModel.sembrarInventario();   

        console.log("✅ Todas las tablas cargadas correctamente.");
    } catch (error) {
        console.error("❌ Fallo crítico al arrancar la BD:", error);
    }
};

// Arrancamos el protocolo de tablas
inicializarBaseDatos();

// ----------------------------------------------------
// ENRUTADOR
// ----------------------------------------------------
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/partidos', partidoRoutes);
app.use('/api/reservas', reservaRoutes); 
app.use('/api/productos', productoRoutes); 

app.get('/api/estado', (req, res) => {
    res.json({ 
        mensaje: '¡Hola Adán! El servidor de MasquePadel está funcionando al 100%',
        estado: 'Online'
    });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});