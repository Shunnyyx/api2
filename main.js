// Función para cargar las estadísticas desde el servidor
async function loadStats() {
    try {
        const response = await fetch('http://localhost:3000/api/stats'); // Cambia la URL si es necesario
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const stats = await response.json();

        // Actualizar el HTML con los datos obtenidos
        document.getElementById('request-count').textContent = stats.requestCount || '0';
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
