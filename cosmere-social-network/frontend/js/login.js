document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim(); // Eliminar espacios adicionales
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('http://localhost:3000/api/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: email, contrasena: password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error desconocido');
        }

        console.log('Inicio de sesión exitoso:', data);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        window.location.href = 'perfil.html';
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        alert('Error: ' + error.message);
    }
});
