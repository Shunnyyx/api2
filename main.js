async function loadStats() {
    try {
        const response = await fetch('http://localhost:3000/api/requests-count');
        const data = await response.json();
        document.getElementById('request-count').textContent = data.requestCount || '0';
    } catch (error) {
        console.error('Error al cargar las estadísticas:', error);
        document.getElementById('request-count').textContent = 'Error';
    }
}

window.onload = () => {
    loadStats();
    setInterval(loadStats, 30000); // Actualiza cada 30 segundos
};
