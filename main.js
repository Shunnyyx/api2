// Función para cargar las estadísticas desde el servidor
async function loadStats() {
    try {
        const response = await fetch('http://localhost:3000/api/stats'); // Asegúrate de que esta URL sea correcta
        const stats = await response.json();

        // Actualizar el HTML con los datos obtenidos
        document.getElementById('request-count').textContent = stats.requestCount || 'Desconocido';
    } catch (error) {
        console.error('Error al cargar las estadísticas:', error);
        document.getElementById('request-count').textContent = 'Error';
    }
}

// Llamar a la función cuando la página se cargue
window.onload = () => {
    // Cargar los datos inmediatamente
    loadStats();

    // Configurar polling para cada 30 segundos (30000 ms)
    setInterval(loadStats, 30000);
};
