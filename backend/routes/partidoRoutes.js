const express = require('express');
const router = express.Router();
const partidoController = require('../controllers/partidoController');

// Ruta para iniciar un partido
router.post('/iniciar', partidoController.iniciarPartido);

// Ruta para registrar un punto en medio de un partido
router.post('/punto', partidoController.registrarPuntoPartido);

module.exports = router;