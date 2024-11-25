const express = require('express');
const { actualizarBaseDeDatos } = require('../helpers/actualizarDB');
const router = express.Router();

// Ruta para actualizar la base de datos
router.get('/actualizar', async (req, res) => {
    try {
        await actualizarBaseDeDatos();
        res.status(200).send({ message: 'Base de datos actualizada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error actualizando la base de datos' });
    }
});

module.exports = router;
