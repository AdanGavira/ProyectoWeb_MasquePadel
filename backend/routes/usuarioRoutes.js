const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas de MasquePadel
router.post('/registro', usuarioController.registrarUsuario);
router.post('/login', usuarioController.loginUsuario); 
router.get('/perfil/:id', usuarioController.obtenerPerfil); 

module.exports = router;