const bcrypt = require('bcrypt');
const pool = require('./config/database'); // Asegúrate de que la ruta sea correcta

(async () => {
    try {
        // Selecciona todos los usuarios con contraseñas sin cifrar
        const result = await pool.query('SELECT id, contrasena FROM usuarios');

        for (const user of result.rows) {
            const { id, contrasena } = user;

            // Verifica si la contraseña ya está cifrada
            if (contrasena.startsWith('$2b$')) {
                console.log(`El usuario con ID ${id} ya tiene una contraseña cifrada. Omitiendo...`);
                continue;
            }

            // Cifra la contraseña
            const hashedPassword = await bcrypt.hash(contrasena, 10);

            // Actualiza la contraseña en la base de datos
            await pool.query('UPDATE usuarios SET contrasena = $1 WHERE id = $2', [hashedPassword, id]);
            console.log(`Contraseña cifrada para el usuario con ID ${id}`);
        }

        console.log('Todas las contraseñas han sido procesadas.');
        process.exit();
    } catch (error) {
        console.error('Error al cifrar contraseñas:', error);
        process.exit(1);
    }
})();
