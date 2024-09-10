async function loadStats(endpoint) {
    try {
        const response = await fetch(`http://localhost:3000/api/requests-count?endpoint=${encodeURIComponent(endpoint)}`);
        const data = await response.json();
        document.getElementById('request-count').textContent = data.requestCount || '0';
    } catch (error) {
        console.error('Error al cargar las estadísticas:', error);
        document.getElementById('request-count').textContent = 'Error';
    }
}

window.onload = () => {
    const endpoint = '/api/cat'; // Puedes cambiar este valor según el endpoint que quieras rastrear
    document.getElementById('request-endpoint').textContent = endpoint;
    loadStats(endpoint);
    setInterval(() => loadStats(endpoint), 30000); // Actualiza cada 30 segundos
};
