document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('Cargando estadísticas...');
        const response = await fetch('http://localhost:3000/api/estadisticas/globales');
        if (!response.ok) throw new Error('Error al obtener estadísticas globales');

        const data = await response.json();
        console.log('Datos recibidos:', data);

        // Asigna los valores directamente a los elementos
        document.getElementById('mundos-descubiertos').textContent = data.mundosDescubiertos;
        document.getElementById('libros-leidos').textContent = data.librosLeidos;
        document.getElementById('insignias-obtenidas').textContent = data.insigniasObtenidas;
    } catch (error) {
        console.error('Error al cargar estadísticas globales:', error.message);
    }
});

async function cargarRanking() {
    try {
        const response = await fetch('http://localhost:3000/api/usuarios/ranking');
        const data = await response.json();

        const rankingList = document.getElementById('ranking-list');
        rankingList.innerHTML = '';

        data.forEach((usuario, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${usuario.nombre} - ${usuario.librosLeidos} libros leídos`;
            rankingList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al cargar ranking:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarRanking();
});
