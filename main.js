// main.js

document.addEventListener('DOMContentLoaded', () => {
    async function fetchStats() {
        try {
            const response = await fetch('https://api.aiko.top/api/stats');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            console.log('Data received:', data); // Agregar consola para depuración

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

    fetchStats();
});
