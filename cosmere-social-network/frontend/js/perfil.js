document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente cargado y procesado.');

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario) {
        // Redirigir al login si no hay usuario en localStorage
        window.location.href = 'login.html';
        return;
    }

    const checklist = document.getElementById('libros-checklist');
    console.log('Elemento #libros-checklist:', checklist);

    const cerrarSesionBtn = document.getElementById('cerrar-sesion-btn');

    cerrarSesionBtn.addEventListener('click', () => {
        // Limpiar datos de sesión
        localStorage.removeItem('usuario');
        sessionStorage.removeItem('usuario');

        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = 'index.html';
    });

    // Mostrar datos del perfil del usuario
    mostrarPerfil(usuario);

    // Inicializar funcionalidades del perfil
    cargarLibros(); // Cargar los libros del Cosmere
    cargarProgreso(usuario.id); // Cargar progreso de libros
    cargarMundosExplorados(usuario.id); // Cargar mundos explorados
    cargarInsignias(usuario.id); // Cargar insignias obtenidas

    // Manejar el formulario de edición de perfil
    inicializarFormularioEdicion(usuario);
});

// Función para mostrar el perfil del usuario
function mostrarPerfil(usuario) {
    document.querySelector('.perfil-imagen').src = `../assets/images/${usuario.imagen_perfil || 'default-profile.png'}`;
    document.querySelector('h2').textContent = usuario.nombre || 'Nombre no definido';
    document.querySelector('.perfil-biografia').textContent = usuario.biografia || 'Sin biografía';
}

// Función para cargar los libros del Cosmere
function cargarLibros() {
    const libros = [
        { mundo: "Roshar", libros: ["El Camino de los Reyes", "Palabras Radiantes", "Juramentada", "El Ritmo de la Guerra"] },
        { mundo: "Scadrial", libros: ["El Imperio Final", "El Pozo de la Ascensión", "El Héroe de las Eras", "Aleación de Ley", "Sombras de Identidad", "Brazales de Duelo", "El Metal Perdido"] },
        { mundo: "Sel", libros: ["Elantris"] },
        { mundo: "Taldain", libros: ["Arena Blanca"] },
        { mundo: "Nalthis", libros: ["El Aliento de los Dioses"] }
    ];

    const checklist = document.getElementById('libros-checklist'); // Cambiamos de 'libros-list' a 'libros-checklist'
    if (!checklist) {
        console.error('No se encontró el contenedor #libros-checklist en el DOM.');
        return;
    }

    checklist.innerHTML = ''; // Limpiar la lista

    libros.forEach(({ mundo, libros }) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${mundo}</strong>: ${libros.join(', ')}`;
        checklist.appendChild(li);
    });
}

// Función para cargar progreso de libros
async function cargarProgreso(usuarioId) {

    const checklist = document.getElementById('libros-checklist');
    if (!checklist) {
        console.error('No se encontró el contenedor #libros-checklist en el DOM.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/progreso/${usuarioId}`);
        const data = await response.json();
        const progresoLibros = data.progreso || [];
        checklist.innerHTML = ''; // Limpiar lista

        // Libros estáticos del Cosmere
        const libros = [
            'Elantris',
            'La Esperanza de Elantris',
            'El Imperio Final',
            'El Pozo de la Ascensión',
            'El Héroe de las Eras',
            'El Aliento de los Dioses',
            'El Camino de los Reyes',
            'Palabras Radiantes',
            'Juramentada',
            'Esquirla del amanecer',
            'El Ritmo de la Guerra',
            'Aleación de Ley',
            'Sombras de Identidad',
            'Brazales de Duelo',
            'El Metal Perdido',
            'Arena Blanca',
            'Trenza del Mar Esmeralda',
            'La guía del mago frugal para sobrevivir en la Inglaterra del Medievo',
            'Yumi y el pintor de pesadillas',
            'El hombre iluminado'
        ];

        libros.forEach(libro => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('libro-checkbox');
            checkbox.checked = progresoLibros.includes(libro);
            li.appendChild(checkbox);

            const label = document.createElement('label');
            label.textContent = libro;
            li.appendChild(label);

            checklist.appendChild(li);
        });

        // Calcular porcentaje de progreso
        const total = libros.length;
        const marcados = progresoLibros.length;
        document.getElementById('progreso-porcentaje').textContent = `${Math.round((marcados / total) * 100)}%`;
    } catch (error) {
        console.error('Error al cargar el progreso:', error.message);
    }
}

// Función para cargar mundos explorados
async function cargarMundosExplorados(usuarioId) {
    const mundosList = document.getElementById('mundos-list');
    if (!mundosList) {
        console.error('No se encontró el contenedor #mundos-list en el DOM.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/mundos-explorados/${usuarioId}`);
        const data = await response.json();

        const mundosCosmere = [
            { mundo: "Roshar", libros: ["El Camino de los Reyes", "Palabras Radiantes", "Juramentada", "El Ritmo de la Guerra"] },
            { mundo: "Scadrial", libros: ["El Imperio Final", "El Pozo de la Ascensión", "El Héroe de las Eras", "Aleación de Ley", "Sombras de Identidad", "Brazales de Duelo", "El Metal Perdido"] },
            { mundo: "Sel", libros: ["Elantris"] },
            { mundo: "Taldain", libros: ["Arena Blanca"] },
            { mundo: "Nalthis", libros: ["El Aliento de los Dioses"] }
        ];

        mundosList.innerHTML = ''; // Limpiar lista

        mundosCosmere.forEach(mundo => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = mundo.mundo; // Cambiado para usar el nombre del mundo
            checkbox.checked = data.mundosExplorados.includes(mundo.mundo); // Verificar si está explorado
            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(` ${mundo.mundo}`));
            mundosList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al cargar los mundos explorados:', error.message);
    }
}


// Función para cargar insignias obtenidas
async function cargarInsignias(usuarioId) {
    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/insignias/${usuarioId}`);
        const data = await response.json();
        const listaInsignias = document.getElementById('lista-insignias');
        listaInsignias.innerHTML = ''; // Limpiar lista

        data.insignias.forEach(insignia => {
            const li = document.createElement('li');
            li.textContent = insignia;
            listaInsignias.appendChild(li);
        });
    } catch (error) {
        console.error('Error al cargar insignias:', error.message);
    }
}

// Función para inicializar el formulario de edición de perfil
function inicializarFormularioEdicion(usuario) {
    document.getElementById('editar-perfil-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const nuevoNombre = document.getElementById('nombre').value;
        const nuevaBiografia = document.getElementById('biografia').value;
        const nuevaImagen = document.getElementById('imagen').files[0];

        const formData = new FormData();
        formData.append('nombre', nuevoNombre);
        formData.append('biografia', nuevaBiografia);
        if (nuevaImagen) {
            formData.append('imagen', nuevaImagen);
        }

        try {
            const response = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}`, {
                method: 'PUT',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el perfil');
            }

            const data = await response.json();
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            location.reload();
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
        }
    });
}
