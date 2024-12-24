document.addEventListener('DOMContentLoaded', () => {
    const nuevaTeoriaBtn = document.getElementById('nueva-teoria-btn');
    const nuevaTeoriaForm = document.getElementById('nueva-teoria-form');
    const listaTeorias = document.getElementById('lista-teorias');
    const buscarTeorias = document.getElementById('buscar-teorias');

    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('categoria');

    // Cargar teorías al iniciar la página
    cargarTeorias(categoria);

    // Crear teoria
    nuevaTeoriaBtn.addEventListener('click', () => {
        window.location.href = 'creareoria.html';
    });

    // Mostrar/Ocultar formulario
    if (nuevaTeoriaBtn && nuevaTeoriaForm) {
        nuevaTeoriaBtn.addEventListener('click', () => {
            nuevaTeoriaForm.classList.toggle('oculto');
        });
    }

    async function cargarTeorias(filtroCategoria = '') {
        try {
            const url = filtroCategoria
                ? `http://localhost:3000/api/teorias?categoria=${filtroCategoria}`
                : 'http://localhost:3000/api/teorias';

            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al obtener las teorías');
            const teorias = await response.json();

            listaTeorias.innerHTML = ''; // Limpiar lista

            teorias.forEach(teoria => {
                const teoriaDiv = document.createElement('div');
                teoriaDiv.classList.add('teoria-item');
                teoriaDiv.dataset.id = teoria.id;

                teoriaDiv.innerHTML = `
                    <h2>${teoria.titulo}</h2>
                    <p>${teoria.descripcion}</p>
                    <p><strong>Etiquetas:</strong> ${teoria.etiquetas ? teoria.etiquetas.join(', ') : 'Sin etiquetas'}</p>
                    <div class="acciones">
                        <button class="me-gusta-btn" data-id="${teoria.id}">Me gusta (${teoria.likes})</button>
                        <button class="comentarios-btn" data-id="${teoria.id}">Comentarios</button>
                    </div>
                    <div id="comentarios-${teoria.id}" class="comentarios-contenedor oculto"></div>
                `;

                listaTeorias.appendChild(teoriaDiv);
            });

            // Añadir eventos a los botones de "Comentarios"
            document.querySelectorAll('.comentarios-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const teoriaId = e.target.dataset.id;
                    mostrarFormularioComentarios(teoriaId);
                });
            });

            // Añadir eventos a los botones de "Me gusta"
            document.querySelectorAll('.me-gusta-btn').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const teoriaId = e.target.dataset.id;
                    await agregarMeGusta(teoriaId);
                });
            });

        } catch (error) {
            console.error('Error al cargar teorías:', error.message);
        }
    }

    async function agregarMeGusta(teoriaId) {
        try {
            const response = await fetch(`http://localhost:3000/api/teorias/${teoriaId}/me-gusta`, {
                method: 'POST'
            });
            if (!response.ok) throw new Error('Error al añadir "me gusta"');
            const data = await response.json();
            console.log(data.message);

            // Recargar teorías para reflejar los cambios
            cargarTeorias(categoria);
        } catch (error) {
            console.error('Error al añadir "me gusta":', error.message);
        }
    }

    function mostrarFormularioComentarios(teoriaId) {
        const comentariosContainer = document.getElementById(`comentarios-${teoriaId}`);
        if (comentariosContainer) {
            comentariosContainer.classList.toggle('oculto'); // Mostrar/Ocultar comentarios
            cargarComentarios(teoriaId, comentariosContainer);
        } else {
            // Crear un contenedor dinámicamente si no existe
            const teoriaDiv = document.querySelector(`.teoria-item[data-id="${teoriaId}"]`);
            const nuevoContenedor = document.createElement('div');
            nuevoContenedor.id = `comentarios-${teoriaId}`;
            nuevoContenedor.classList.add('comentarios-contenedor');
            teoriaDiv.appendChild(nuevoContenedor);

            cargarComentarios(teoriaId, nuevoContenedor);
        }
    }

    async function cargarComentarios(teoriaId, contenedor) {
        try {
            const response = await fetch(`http://localhost:3000/api/teorias/${teoriaId}/comentarios`);
            if (!response.ok) throw new Error('Error al cargar comentarios');
            const comentarios = await response.json();

            contenedor.innerHTML = ''; // Limpiar contenedor

            comentarios.forEach(comentario => {
                const comentarioDiv = document.createElement('div');
                comentarioDiv.classList.add('comentario-item');
                comentarioDiv.innerHTML = `
                    <p><strong>${comentario.autor}:</strong> ${comentario.comentario}</p>
                    <small>${new Date(comentario.fecha_creacion).toLocaleString()}</small>
                `;
                contenedor.appendChild(comentarioDiv);
            });

            // Añadir formulario para nuevo comentario
            const formularioComentario = document.createElement('form');
            formularioComentario.classList.add('formulario-comentario');
            formularioComentario.innerHTML = `
                <input type="text" placeholder="Escribe un comentario..." required>
                <button type="submit">Publicar</button>
            `;

            formularioComentario.addEventListener('submit', async (event) => {
                event.preventDefault();
                const comentario = formularioComentario.querySelector('input').value;
                await agregarComentario(teoriaId, comentario);
                formularioComentario.reset();
                cargarComentarios(teoriaId, contenedor); // Recargar comentarios
            });

            contenedor.appendChild(formularioComentario);
        } catch (error) {
            console.error('Error al cargar comentarios:', error.message);
        }
    }

    async function agregarComentario(teoriaId, comentario) {
        try {
            const usuarioId = JSON.parse(localStorage.getItem('usuario')).id; // Suponiendo que el usuario está logueado
            const response = await fetch(`http://localhost:3000/api/teorias/${teoriaId}/comentarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comentario, usuarioId })
            });
            if (!response.ok) throw new Error('Error al añadir comentario');
            const data = await response.json();
            console.log(data.message);

            // Recargar teorías si es necesario
            cargarTeorias(categoria);
        } catch (error) {
            console.error('Error al añadir comentario:', error.message);
        }
    }

    // Publicar nueva teoría
    if (nuevaTeoriaForm) {
        nuevaTeoriaForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const titulo = document.getElementById('titulo-teoria').value;
            const descripcion = document.getElementById('descripcion-teoria').value;
            const etiquetas = document.getElementById('etiquetas-teoria').value.split(',').map(tag => tag.trim());
            const imagen = document.getElementById('imagen-teoria').files[0];

            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('descripcion', descripcion);
            formData.append('etiquetas', JSON.stringify(etiquetas));
            if (imagen) {
                formData.append('imagen', imagen);
            }

            try {
                const response = await fetch('http://localhost:3000/api/teorias', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Error al publicar la teoría');
                }

                cargarTeorias(categoria);
            } catch (error) {
                console.error(error.message);
            }
        });
    }
});
