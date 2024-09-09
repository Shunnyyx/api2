// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Función para obtener estadísticas del servidor
    async function fetchStats() {
        try {
            const response = await fetch('https://api.aiko.top/api/stats'); // Asegúrate de que esta URL sea correcta
            const data = await response.json();

            // Actualiza los elementos HTML con los datos recibidos
            document.getElementById('endpoints-count').textContent = data.endpointsCount || 'N/A';
            document.getElementById('user-count').textContent = data.userCount || 'N/A';
            document.getElementById('request-count').textContent = data.requestCount || 'N/A';
            document.getElementById('uptime').textContent = data.uptime || 'N/A';
        } catch (error) {
            console.error('Error al cargar las estadísticas:', error);
            document.getElementById('endpoints-count').textContent = 'Error';
            document.getElementById('user-count').textContent = 'Error';
            document.getElementById('request-count').textContent = 'Error';
            document.getElementById('uptime').textContent = 'Error';
        }
    }

    // Llama a la función para cargar las estadísticas cuando la página se cargue
    fetchStats();
});
