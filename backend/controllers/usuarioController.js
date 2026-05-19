const UsuarioModel = require('../models/UsuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// CLAVE SECRETA (En producción esto iría encriptado en otro lado)
const SECRET_KEY = 'MasquePadel_Clave_Ultra_Secreta_2026';

// 1. REGISTRO SEGURO
const registrarUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) return res.status(400).json({ error: 'Faltan campos' });

    try {
        // ENCRIPTAMOS LA CONTRASEÑA (Le damos 10 vueltas de tuerca)
        const salt = await bcrypt.genSalt(10);
        const passwordEncriptada = await bcrypt.hash(password, salt);

        // Guardamos el usuario con la contraseña ilocalizable
        const nuevoUsuario = await UsuarioModel.crearUsuario(nombre, email, passwordEncriptada);
        res.status(201).json({ mensaje: 'Usuario registrado con seguridad', usuario: nuevoUsuario.email });
    } catch (error) {
        res.status(500).json({ error: 'Error guardando usuario (¿email duplicado?)' });
    }
};

// 2. INICIO DE SESIÓN (LOGIN)
const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Paso A: Buscar si el correo existe
        const usuario = await UsuarioModel.buscarUsuarioPorEmail(email);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        // Paso B: Comprobar que la contraseña escrita coincide con la encriptada
        const passwordCorrecta = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecta) return res.status(401).json({ error: 'Contraseña incorrecta' });

        // Paso C: Crear el "Pase VIP" (Token JWT) para la app y la web
        const token = jwt.sign(
            { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol }, 
            SECRET_KEY, 
            { expiresIn: '24h' } // El pase caduca en 24 horas
        );

        res.json({
            mensaje: '¡Login correcto! Bienvenido a MasquePadel',
            token: token
        });

    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor al intentar hacer login' });
    }
};

// FUNCIÓN: Devolver los datos del perfil
const obtenerPerfil = async (req, res) => {
    // Escaneamos el ID que Android ha puesto en la URL (/perfil/8)
    const idUsuario = req.params.id; 

    try {
        // Hacemos una consulta limpia a BBDD (Sin la contraseña, ¡seguridad ante todo!)
        const query = 'SELECT id, nombre, email, rol FROM usuarios WHERE id = $1';
        const { rows } = await require('../config/db').query(query, [idUsuario]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario fantasma no encontrado' });
        }

        // Se lo devolvemos como JSON a Retrofit
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error interno conectando a PostgreSQL' });
    }
};

// No olvides exportarla abajo:
module.exports = {
    registrarUsuario,
    loginUsuario,
    obtenerPerfil 
};