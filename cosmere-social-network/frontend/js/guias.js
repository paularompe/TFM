document.addEventListener('DOMContentLoaded', () => {
    const listaGuias = document.getElementById('lista-guias');
    const buscarInput = document.getElementById('buscar-guia');
    const buscarBtn = document.getElementById('buscar-btn');

    if (!listaGuias) {
        console.error('No se encontró el contenedor #lista-guias en el DOM.');
        return;
    }

    // Función para cargar guías desde el backend
    async function cargarGuias(filtro = '') {
        const url = filtro 
            ? `http://localhost:3000/api/guias/buscar?q=${encodeURIComponent(filtro)}`
            : 'http://localhost:3000/api/guias';
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al obtener las guías');

            const guias = await response.json();
            listaGuias.innerHTML = ''; // Limpiar lista antes de agregar

            if (guias.length === 0) {
                listaGuias.innerHTML = '<p>No se encontraron guías.</p>';
                return;
            }

            guias.forEach(guia => {
                const guiaElem = document.createElement('div');
                guiaElem.classList.add('guia');
                guiaElem.innerHTML = `
                    <h3>${guia.titulo}</h3>
                    <p>${guia.descripcion}</p>
                    <p><strong>Likes:</strong> ${guia.likes}</p>
                    <a href="guiaDetalle.html?id=${guia.id}" class="btn">Leer más</a>
                `;
                listaGuias.appendChild(guiaElem);
            });
        } catch (error) {
            console.error('Error al cargar las guías:', error.message);
            listaGuias.innerHTML = '<p>Error al cargar las guías. Inténtalo de nuevo más tarde.</p>';
        }
    }

    // Event listeners para buscar guías
    buscarBtn.addEventListener('click', () => {
        const filtro = buscarInput.value.trim();
        cargarGuias(filtro);
    });

    buscarInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const filtro = buscarInput.value.trim();
            cargarGuias(filtro);
        }
    });

    // Cargar todas las guías al inicio
    cargarGuias();
});
