// Función para cargar los logs desde el servidor
async function loadLogs() {
    try {
        const response = await fetch('http://localhost:3000/api/vercel-logs'); // Asegúrate de que esta URL sea correcta
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const logs = await response.json();

        // Procesar y mostrar los logs
        // Esto es solo un ejemplo, ajusta según el formato de los logs
        document.getElementById('logs').textContent = JSON.stringify(logs, null, 2);
    } catch (error) {
        console.error('Error al cargar los logs:', error);
        document.getElementById('logs').textContent = 'Error al cargar los logs';
    }
}

// Llamar a la función cuando la página se cargue
window.onload = () => {
    loadLogs();
    setInterval(loadLogs, 30000); // Actualizar cada 30 segundos
};
