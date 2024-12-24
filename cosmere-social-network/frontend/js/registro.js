document.getElementById('registro-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir la recarga de la página

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    try {
        const response = await fetch('http://localhost:3000/api/usuarios/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, contrasena }),
        });

        if (!response.ok) throw new Error('Error al registrarse');

        const data = await response.json();
        alert('Usuario registrado con éxito');
        window.location.href = 'login.html'; // Redirigir al login
    } catch (error) {
        console.error('Error al registrarse:', error.message);
        console.log({ nombre, email, contrasena });
        alert('Hubo un error al registrarse. Intenta nuevamente.');
    }
});
