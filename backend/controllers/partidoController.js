const PartidoModel = require('../models/PartidoModel');

const iniciarPartido = async (req, res) => {
    const { j1, j2, j3, j4 } = req.body;

    // Mini-policía: No podemos empezar a jugar sin 4 jugadores
    if (!j1 || !j2 || !j3 || !j4) {
        return res.status(400).json({ error: 'Se necesitan 4 IDs de jugadores' });
    }

    try {
        const nuevoPartido = await PartidoModel.crearPartido(j1, j2, j3, j4);
        res.status(201).json({
            mensaje: '¡Partido iniciado! Que ruede la bola.',
            partido: nuevoPartido
        });
    } catch (error) {
        console.error('Error al iniciar partido:', error);
        res.status(500).json({ error: 'Hubo un error al crear la pista' });
    }
};

const registrarPuntoPartido = async (req, res) => {
    // La App de Android nos enviará esto cuando el usuario pulse un botón
    const { partido_id, jugador_id, tipo_jugada, set_num, juego_num } = req.body;

    if (!partido_id || !jugador_id || !tipo_jugada) {
        return res.status(400).json({ error: 'Faltan datos de la jugada' });
    }

    try {
        // Guardamos el punto en la base de datos
        const nuevoPunto = await PartidoModel.registrarPunto(partido_id, jugador_id, tipo_jugada, set_num, juego_num);
        res.status(201).json({
            mensaje: 'Punto anotado en el acta.',
            punto: nuevoPunto
        });
    } catch (error) {
        console.error('Error al registrar punto:', error);
        res.status(500).json({ error: 'Hubo un error del VAR al apuntar el tanto' });
    }
};

// Exórtalo abajo:
module.exports = {
    iniciarPartido,
    registrarPuntoPartido // <-- AÑADIDO
};