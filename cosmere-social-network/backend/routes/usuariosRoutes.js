const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const pool = require('../config/database');

const router = express.Router();

const { calcularInsignias } = require('../utils/insignias');

// Configuración de multer para manejar la carga de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Nombre único para cada archivo
    }
});
const upload = multer({ storage });

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, nombre, correo FROM usuarios');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { nombre, correo, contrasena } = req.body;

    try {
        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Insertar usuario en la base de datos
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, correo, contrasena) VALUES ($1, $2, $3) RETURNING id, nombre, correo',
            [nombre, correo, hashedPassword]
        );

        res.json({ message: 'Usuario registrado correctamente', usuario: result.rows[0] });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

// Ruta para autenticar usuario
router.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;

    console.log('--- INICIO DE SESIÓN ---');
    console.log('Correo recibido:', correo);
    console.log('Contraseña recibida:', contrasena);

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
        console.log('Resultado de la consulta:', result.rows);

        if (result.rows.length > 0) {
            const usuario = result.rows[0];
            console.log('Usuario encontrado:', usuario);

            // Comparar contraseñas
            const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);
            console.log('¿Las contraseñas coinciden?:', passwordMatch);

            if (!passwordMatch) {
                console.warn('Contraseña incorrecta para el usuario:', correo);
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            // Inicio de sesión exitoso
            res.json({
                message: 'Inicio de sesión exitoso',
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                    biografia: usuario.biografia || '',
                    imagen_perfil: usuario.imagen_perfil || 'default-profile.png'
                }
            });
        } else {
            console.warn('Usuario no encontrado:', correo);
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

// Ruta para obtener el progreso del checklist de un usuario
router.get('/progreso/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const result = await pool.query('SELECT progreso_libros FROM usuarios WHERE id = $1', [usuarioId]);

        if (result.rows.length > 0) {
            res.json({ progreso: result.rows[0].progreso_libros || [] });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el progreso:', error.message);
        res.status(500).json({ error: 'Error al obtener el progreso' });
    }
});


// Ruta para actualizar el progreso del checklist de un usuario
router.put('/progreso/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;
    const { progreso } = req.body;

    try {
        // Actualizar el progreso del usuario en la base de datos
        const result = await pool.query(
            'UPDATE usuarios SET progreso_libros = $1 WHERE id = $2 RETURNING progreso_libros',
            [JSON.stringify(progreso), usuarioId]
        );

        if (result.rows.length > 0) {
            res.json({ message: 'Progreso actualizado correctamente', progreso: result.rows[0].progreso_libros });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el progreso' });
    }
});

// Ruta para editar el perfil del usuario
router.put('/:usuarioId', upload.single('imagen'), async (req, res) => {
    const { usuarioId } = req.params;
    const { nombre, biografia } = req.body;
    const imagen = req.file ? req.file.filename : null;

    try {
        const result = await pool.query(
            'UPDATE usuarios SET nombre = $1, biografia = $2, imagen_perfil = $3 WHERE id = $4 RETURNING id, nombre, correo, biografia, imagen_perfil',
            [nombre, biografia, imagen, usuarioId]
        );

        if (result.rows.length > 0) {
            res.json({ message: 'Perfil actualizado correctamente', usuario: result.rows[0] });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
});

//Obtener mundos explorados
router.get('/mundos-explorados/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const result = await pool.query('SELECT mundos_explorados FROM usuarios WHERE id = $1', [usuarioId]);

        if (result.rows.length > 0) {
            res.json({ mundosExplorados: result.rows[0].mundos_explorados || [] });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener mundos explorados:', error.message);
        res.status(500).json({ error: 'Error al obtener mundos explorados' });
    }
});

//Actualiza mundos explorados
router.put('/mundos-explorados/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;
    const { mundosExplorados } = req.body;

    const mundosCosmere = [
        { mundo: "Roshar", libros: ["El Camino de los Reyes", "Palabras Radiantes", "Juramentada", "El Ritmo de la Guerra"] },
        { mundo: "Scadrial", libros: ["El Imperio Final", "El Pozo de la Ascensión", "El Héroe de las Eras", "Aleación de Ley", "Sombras de Identidad", "Brazales de Duelo", "El Metal Perdido"] },
        { mundo: "Sel", libros: ["Elantris"] },
        { mundo: "Taldain", libros: ["Arena Blanca"] },
        { mundo: "Nalthis", libros: ["El Aliento de los Dioses"] }
    ];

    try {
        const result = await pool.query(
            'UPDATE usuarios SET mundos_explorados = $1 WHERE id = $2 RETURNING mundos_explorados',
            [JSON.stringify(mundosExplorados), usuarioId]
        );

        if (result.rows.length > 0) {
            // Calcular Insignias
            const insignias = calcularInsignias(mundosExplorados, mundosCosmere);

            // Guardar Insignias
            await pool.query(
                'UPDATE usuarios SET insignias = $1 WHERE id = $2',
                [JSON.stringify(insignias), usuarioId]
            );

            res.json({
                message: 'Mundos explorados e insignias actualizados correctamente',
                mundosExplorados: result.rows[0].mundos_explorados,
                insignias
            });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar mundos explorados e insignias:', error.message);
        res.status(500).json({ error: 'Error al actualizar mundos explorados e insignias' });
    }
});

//Obtener insignias
router.get('/insignias/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const result = await pool.query('SELECT insignias FROM usuarios WHERE id = $1', [usuarioId]);
        if (result.rows.length > 0) {
            res.json({ insignias: result.rows[0].insignias || [] });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener insignias:', error);
        res.status(500).json({ error: 'Error al obtener insignias' });
    }
});

//Actualizar insignias
router.put('/insignias/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;
    const { insignias } = req.body;

    try {
        const result = await pool.query(
            'UPDATE usuarios SET insignias = $1 WHERE id = $2 RETURNING insignias',
            [JSON.stringify(insignias), usuarioId]
        );

        if (result.rows.length > 0) {
            res.json({ message: 'Insignias actualizadas correctamente', insignias: result.rows[0].insignias });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar insignias:', error);
        res.status(500).json({ error: 'Error al actualizar insignias' });
    }
});

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        // Comprobar si el correo ya está registrado
        const correoExistente = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
        if (correoExistente.rows.length > 0) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        // Insertar el nuevo usuario
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, correo, contrasena) VALUES ($1, $2, $3) RETURNING *',
            [nombre, correo, contrasena]
        );

        res.status(201).json({ message: 'Usuario registrado con éxito', usuario: result.rows[0] });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

module.exports = router;
