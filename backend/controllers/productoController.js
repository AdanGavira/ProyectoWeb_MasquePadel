const ProductoModel = require('../models/ProductoModel');

const verEscaparate = async (req, res) => {
    try {
        const inventario = await ProductoModel.obtenerTodosLosProductos();
        res.json(inventario);
    } catch (error) {
        res.status(500).json({ error: 'Fallo logístico en la tienda' });
    }
};

module.exports = { verEscaparate };