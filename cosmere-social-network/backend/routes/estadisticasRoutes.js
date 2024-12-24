const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Ruta para obtener estadísticas globales
router.get('/globales', async (req, res) => {
    try {
        const totalUsuarios = await pool.query('SELECT COUNT(*) AS total FROM usuarios');
        
        const mundosDescubiertos = await pool.query(`
            SELECT COUNT(DISTINCT elemento) AS total
            FROM usuarios, jsonb_array_elements_text(mundos_explorados::jsonb) elemento
        `);

        const librosLeidos = await pool.query(`
            SELECT COUNT(DISTINCT elemento) AS total
            FROM usuarios, jsonb_array_elements_text(progreso_libros::jsonb) elemento
        `);

        const insigniasObtenidas = await pool.query(`
            SELECT COUNT(DISTINCT elemento) AS total
            FROM usuarios, jsonb_array_elements_text(insignias::jsonb) elemento
        `);

        res.json({
            totalUsuarios: totalUsuarios.rows[0].total || 0,
            mundosDescubiertos: mundosDescubiertos.rows[0].total || 0,
            librosLeidos: librosLeidos.rows[0].total || 0,
            insigniasObtenidas: insigniasObtenidas.rows[0].total || 0
        });
    } catch (error) {
        console.error('Error al obtener estadísticas globales:', error);
        res.status(500).json({ error: 'Error al obtener estadísticas globales' });
    }
});

router.get('/usuarios/ranking', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT nombre, COUNT(unnest(progreso_libros)) AS librosLeidos
            FROM usuarios
            GROUP BY nombre
            ORDER BY librosLeidos DESC
            LIMIT 5
        `);

        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener ranking:', error.message);
        res.status(500).json({ error: 'Error al obtener ranking' });
    }
});

module.exports = router;
