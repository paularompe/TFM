const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // Asegúrate de que esta conexión está configurada

// Ruta para obtener todas las guías
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, titulo, descripcion, imagen, likes, fecha_creacion FROM guias ORDER BY fecha_creacion DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener guías:', error);
        res.status(500).json({ error: 'Error al obtener las guías' });
    }
});

// Ruta para buscar guías
router.get('/buscar', async (req, res) => {
    const { q } = req.query; // Palabra clave enviada como parámetro de consulta

    try {
        const query = `
            SELECT * FROM guias 
            WHERE LOWER(titulo) LIKE LOWER($1)
            OR LOWER(descripcion) LIKE LOWER($1)
            OR $1 = ANY(etiquetas)
            ORDER BY fecha_creacion DESC
        `;
        const params = [`%${q}%`];
        const result = await pool.query(query, params);

        res.json(result.rows);
    } catch (error) {
        console.error('Error al buscar guías:', error.message);
        res.status(500).json({ error: 'Error al buscar guías' });
    }
});

// Ruta para obtener detalles de una guía
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM guias WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Guía no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener los detalles de la guía:', error);
        res.status(500).json({ error: 'Error al obtener los detalles de la guía' });
    }
});

// Ruta para crear una guía
router.post('/', async (req, res) => {
    const { titulo, descripcion, contenido, etiquetas, usuario_id } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO guias (titulo, descripcion, contenido, etiquetas, usuario_id) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [titulo, descripcion, contenido, etiquetas, usuario_id]
        );

        res.json({ message: 'Guía creada con éxito', guia: result.rows[0] });
    } catch (error) {
        console.error('Error al crear guía:', error);
        res.status(500).json({ error: 'Error al crear guía' });
    }
});

// Ruta para añadir "me gusta" a una guía
router.post('/:id/me-gusta', async (req, res) => {
    const { id } = req.params;
    console.log(`Intentando añadir "me gusta" a la guía con ID: ${id}`);

    try {
        const result = await pool.query(
            'UPDATE guias SET likes = likes + 1 WHERE id = $1 RETURNING likes',
            [id]
        );

        console.log('Resultado de la consulta:', result.rows);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Guía no encontrada' });
        }

        res.json({ message: '¡Me gusta añadido!', likes: result.rows[0].likes });
    } catch (error) {
        console.error('Error al añadir "me gusta":', error.message);
        res.status(500).json({ error: 'Error al añadir "me gusta"' });
    }
});

module.exports = router;
