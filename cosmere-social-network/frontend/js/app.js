// Obtener usuarios desde el backend
async function fetchUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/api/usuarios');
        if (!response.ok) {
            throw new Error('Error al obtener usuarios');
        }
        const usuarios = await response.json();
        renderUsuarios(usuarios);
    } catch (error) {
        console.error(error.message);
    }
}

// Renderizar usuarios en la página
function renderUsuarios(usuarios) {
    const usuariosList = document.getElementById('usuarios-list');
    usuariosList.innerHTML = ''; // Limpiar contenido previo
    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.textContent = `${usuario.nombre} - ${usuario.correo}`;
        usuariosList.appendChild(li);
    });
}

async function fetchForos() {
    try {
        const response = await fetch('http://localhost:3000/api/foros');
        const foros = await response.json();
        renderForos(foros);
    } catch (error) {
        console.error('Error al obtener foros:', error);
    }
}

function renderForos(foros) {
    const forosList = document.getElementById('foros-list');
    forosList.innerHTML = '';
    foros.forEach(foro => {
        const li = document.createElement('li');
        li.textContent = `${foro.titulo}: ${foro.descripcion}`;
        forosList.appendChild(li);
    });
}
