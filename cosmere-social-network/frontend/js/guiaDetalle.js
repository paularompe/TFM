const processMarkdown = (texto) => {
    return texto
        .replace(/####\s(.+)/g, '<h4>$1</h4>') // Convert #### to <h4>
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Convert **text** to <strong>
        .replace(/\n/g, '<br>'); // Convert newlines to <br>
};

document.addEventListener('DOMContentLoaded', async () => {
    const detalleGuia = document.getElementById('detalle-guia');
    const params = new URLSearchParams(window.location.search);
    const guiaId = params.get('id');

    if (!guiaId) {
        detalleGuia.innerHTML = '<p>Error: No se proporcionó una guía válida.</p>';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/guias/${guiaId}`);
        if (!response.ok) throw new Error('Error al obtener los detalles de la guía');
        const guia = await response.json();

        // Procesar contenido en formato Markdown
        const contenidoHTML = processMarkdown(guia.contenido);

        detalleGuia.innerHTML = `
            <h1>${guia.titulo}</h1>
            ${guia.imagen ? `<img src="../assets/images/guias/${guia.imagen}" alt="${guia.titulo}">` : ''}
            <p><strong>Fecha de creación:</strong> ${new Date(guia.fecha_creacion).toLocaleDateString()}</p>
            ${contenidoHTML}
            <div id="acciones-guia">
                <button id="me-gusta-btn">Me gusta (${guia.likes})</button>
                <a href="guias.html" class="btn-regresar">Volver a las guías</a>
            </div>
        `;

        // Asignar evento al botón de "Me gusta"
        const meGustaBtn = document.getElementById('me-gusta-btn');

        meGustaBtn.addEventListener('click', async () => {
            try {
                const likeResponse = await fetch(`http://localhost:3000/api/guias/${guiaId}/me-gusta`, {
                    method: 'POST',
                });
                if (!likeResponse.ok) throw new Error('Error al añadir "me gusta"');
                const likeData = await likeResponse.json();
                meGustaBtn.textContent = `Me gusta (${likeData.likes})`; // Actualizar el texto del botón
            } catch (error) {
                console.error('Error al añadir "me gusta":', error.message);
            }
        });
    } catch (error) {
        console.error('Error al cargar los detalles de la guía:', error.message);
        detalleGuia.innerHTML = '<p>Error al cargar los detalles de la guía.</p>';
    }
});
