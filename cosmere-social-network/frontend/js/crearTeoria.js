document.addEventListener('DOMContentLoaded', () => {
    const nuevaTeoriaForm = document.getElementById('nueva-teoria-form');

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

            alert('Teoría publicada exitosamente');
            window.location.href = 'teorias.html'; // Redirigir de vuelta a la lista de teorías
        } catch (error) {
            console.error(error.message);
            alert('Error al publicar la teoría. Inténtalo nuevamente.');
        }
    });
});
