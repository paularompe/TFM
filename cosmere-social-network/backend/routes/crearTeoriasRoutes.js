const express = require('express');
const pool = require('../config/database');
const multer = require('multer');

const router = express.Router();

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta de destino para las imágenes
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Nombre único para cada archivo
    },
});

const upload = multer({ storage });

// Ruta para crear una nueva teoría
router.post('/', upload.single('imagen'), async (req, res) => {
    const { titulo, descripcion, etiquetas } = req.body;
    const imagen = req.file ? req.file.filename : null;

    try {
        const etiquetasArray = Array.isArray(etiquetas) ? etiquetas : [etiquetas]; // Asegurar que siempre sea un array
        const result = await pool.query(
            'INSERT INTO teorias (titulo, descripcion, etiquetas, imagen) VALUES ($1, $2, $3, $4) RETURNING *',
            [titulo, descripcion, etiquetasArray, imagen]
        );
        res.json({ message: 'Teoría creada exitosamente', teoria: result.rows[0] });
    } catch (error) {
        console.error('Error al crear teoría:', error);
        res.status(500).json({ error: 'Error al crear teoría' });
    }
});

module.exports = router;
