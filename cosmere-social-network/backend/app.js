const express = require('express');
const path = require('path');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Importar rutas
const usuariosRoutes = require('./routes/usuariosRoutes');
app.use('/api/usuarios', usuariosRoutes);

const teoriasRoutes = require('./routes/teoriasRoutes');
app.use('/api/teorias', teoriasRoutes);

const guiasRoutes = require('./routes/guiasRoutes');
app.use('/api/guias', guiasRoutes);

const estadisticasRoutes = require('./routes/estadisticasRoutes');
app.use('/api/estadisticas', estadisticasRoutes);

const crearTeoriasRoutes = require('./routes/crearTeoriasRoutes');
app.use('/api/crearTeorias', crearTeoriasRoutes);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta raíz (opcional, ya está incluida en los estáticos)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/index.html'));
});

// Puerto del servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
