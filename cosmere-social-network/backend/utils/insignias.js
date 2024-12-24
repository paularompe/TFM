function calcularInsignias(mundosExplorados, mundosCosmere) {
    const insignias = [];

    // Revisar mundos completados
    mundosCosmere.forEach(mundo => {
        const librosMundo = mundo.libros;
        const mundoExplorado = mundosExplorados.includes(mundo.mundo);

        if (mundoExplorado) {
            insignias.push(`Explorador de ${mundo.mundo}`);
        }
    });

    // Insignia por explorar todos los mundos
    const todosMundosExplorados = mundosCosmere.every(mundo => mundosExplorados.includes(mundo.mundo));
    if (todosMundosExplorados) {
        insignias.push('Conquistador del Cosmere');
    }

    // Insignia por leer todos los libros
    const todosLosLibros = mundosCosmere.flatMap(mundo => mundo.libros);
    const librosLeidos = mundosExplorados.flatMap(mundo =>
        mundosCosmere.find(m => m.mundo === mundo)?.libros || []
    );
    const todosLibrosLeidos = todosLosLibros.every(libro => librosLeidos.includes(libro));

    if (todosLibrosLeidos) {
        insignias.push('Eterno del Cosmere');
    }

    return insignias;
}

module.exports = { calcularInsignias };

async function cargarInsignias(usuarioId) {
    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/insignias/${usuarioId}`);
        const data = await response.json();

        console.log('Insignias obtenidas del backend:', data);

        const listaInsignias = document.getElementById('lista-insignias');
        listaInsignias.innerHTML = '';
        data.insignias.forEach(insignia => {
            const li = document.createElement('li');
            li.textContent = insignia;
            listaInsignias.appendChild(li);
        });
    } catch (error) {
        console.error('Error al cargar insignias:', error.message);
    }
}
