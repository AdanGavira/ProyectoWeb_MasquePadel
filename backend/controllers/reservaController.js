const ReservaModel = require('../models/ReservaModel');

// 1. Ver pistas ocupadas
const verDisponibilidad = async (req, res) => {
    const { fecha } = req.params; // Ej: 2026-05-14
    try {
        const ocupadas = await ReservaModel.obtenerReservasPorDia(fecha);
        res.json(ocupadas);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar las pistas' });
    }
};

// 2. Hacer la reserva
const confirmarReserva = async (req, res) => {
    const { usuario_id, pista_numero, fecha, hora } = req.body;

    if (!usuario_id || !pista_numero || !fecha || !hora) {
        return res.status(400).json({ error: 'Faltan datos para la reserva' });
    }

    try {
        const nuevaReserva = await ReservaModel.crearReserva(usuario_id, pista_numero, fecha, hora);
        res.status(201).json({ mensaje: '¡Pista reservada con éxito!', reserva: nuevaReserva });
    } catch (error) {
        // Como pusimos UNIQUE en la base de datos, si la pista está pillada saltará este error
        res.status(400).json({ error: 'Lo sentimos, alguien acaba de reservar esa pista a esa hora.' });
    }
};

module.exports = { verDisponibilidad, confirmarReserva };