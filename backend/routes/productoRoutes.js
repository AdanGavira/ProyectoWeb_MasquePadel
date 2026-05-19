const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Cuando la web pregunte por el stock, dáselo todo
router.get('/todos', productoController.verEscaparate);

module.exports = router;