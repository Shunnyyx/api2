async function loadStats() {
    try {
        const response = await fetch('http://localhost:3000/api/requests-count');
        const data = await response.json();

        // Actualiza el HTML con los datos obtenidos
        document.getElementById('cat-count').textContent = data['/api/cat'] || '0';
        document.getElementById('dog-count').textContent = data['/api/dog'] || '0';
        document.getElementById('bird-count').textContent = data['/api/bird'] || '0';
        document.getElementById('fox-count').textContent = data['/api/fox'] || '0';
        document.getElementById('hug-count').textContent = data['/api/hug'] || '0';
        document.getElementById('anime-count').textContent = data['/api/anime'] || '0';
    } catch (error) {
        console.error('Error al cargar las estadísticas:', error);
        document.getElementById('cat-count').textContent = 'Error';
        document.getElementById('dog-count').textContent = 'Error';
        document.getElementById('bird-count').textContent = 'Error';
        document.getElementById('fox-count').textContent = 'Error';
        document.getElementById('hug-count').textContent = 'Error';
        document.getElementById('anime-count').textContent = 'Error';
    }
}

// Llama a la función cuando la página se cargue
window.onload = () => {
    loadStats();
    setInterval(loadStats, 30000); // Actualiza cada 30 segundos
};
