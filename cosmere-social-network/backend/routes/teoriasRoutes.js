const express = require('express');
const pool = require('../config/database');

const router = express.Router();

// Ruta para obtener todas las teorías
router.get('/', async (req, res) => {
    const { order = 'fecha_creacion' } = req.query; // Valor predeterminado: fecha_creacion

    try {
        let query = 'SELECT * FROM teorias';
        if (order === 'likes') {
            query += ' ORDER BY likes DESC';
        } else {
            query += ' ORDER BY fecha_creacion DESC';
        }

        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener teorías:', error);
        res.status(500).json({ error: 'Error al obtener teorías' });
    }
});

// Ruta para añadir un comentario a una teoría
router.post('/:id/comentarios', async (req, res) => {
    const { id } = req.params;
    const { comentario, usuarioId } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO comentarios (teoria_id, usuario_id, comentario) VALUES ($1, $2, $3) RETURNING *',
            [id, usuarioId, comentario]
        );

        res.json({ message: 'Comentario añadido con éxito', comentario: result.rows[0] });
    } catch (error) {
        console.error('Error al añadir comentario:', error);
        res.status(500).json({ error: 'Error al añadir comentario' });
    }
});

// Ruta para dar "me gusta" a una teoría
router.post('/:id/me-gusta', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'UPDATE teorias SET likes = likes + 1 WHERE id = $1 RETURNING likes',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Teoría no encontrada' });
        }

        res.json({ message: '¡Me gusta añadido!', likes: result.rows[0].likes });
    } catch (error) {
        console.error('Error al añadir "me gusta":', error);
        res.status(500).json({ error: 'Error al añadir "me gusta"' });
    }
});

// Ruta para obtener los comentarios de una teoría
router.get('/:id/comentarios', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'SELECT c.comentario, c.fecha_creacion, u.nombre AS autor FROM comentarios c JOIN usuarios u ON c.usuario_id = u.id WHERE c.teoria_id = $1 ORDER BY c.fecha_creacion ASC',
            [id]
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ error: 'Error al obtener comentarios' });
    }
});

// Ruta para obtener teorías filtradas por categoría
router.get('/categoria', async (req, res) => {
    const { categoria } = req.query;

    try {
        let query = 'SELECT * FROM teorias';
        const params = [];

        if (categoria) {
            query += ' WHERE $1 = ANY(etiquetas)';
            params.push(categoria);
        }

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener teorías:', error.message);
        res.status(500).json({ error: 'Error al obtener teorías' });
    }
});

module.exports = router;
