const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

// Consultar pistas libres un día
router.get('/disponibilidad/:fecha', reservaController.verDisponibilidad);

// Reservar una pista
router.post('/nueva', reservaController.confirmarReserva);

module.exports = router;