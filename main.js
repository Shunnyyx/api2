// Función para cargar las estadísticas desde el servidor
async function loadStats() {
    try {
        const response = await fetch('/api/stats'); // La URL puede ser relativa si estás sirviendo desde el mismo dominio
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const stats = await response.json();

        // Actualizar el HTML con los datos obtenidos
        document.getElementById('endpoints-count').textContent = stats.endpointsCount || 'Desconocido';
        document.getElementById('user-count').textContent = stats.userCount || 'Desconocido';
        document.getElementById('request-count').textContent = stats.requestCount || 'Desconocido';
        document.getElementById('uptime').textContent = stats.uptime || 'Desconocido';
    } catch (error) {
        console.error('Error al cargar las estadísticas:', error);
        document.getElementById('endpoints-count').textContent = 'Error';
        document.getElementById('user-count').textContent = 'Error';
        document.getElementById('request-count').textContent = 'Error';
        document.getElementById('uptime').textContent = 'Error';
    }
}

// Llamar a la función cuando la página se cargue
window.onload = () => {
    loadStats();
    setInterval(loadStats, 30000); // Actualiza cada 30 segundos
};
