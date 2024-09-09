// Añade esto a tu archivo de configuración del servidor

app.get('/api/stats', (req, res) => {
    // Suponiendo que tienes una manera de obtener estos datos
    const stats = {
        endpointsCount: 8, // Cambia esto con la lógica real para contar endpoints
        userCount: 450, // Cambia esto con la lógica real para contar usuarios
        requestCount: 150000, // Cambia esto con la lógica real para contar solicitudes
        uptime: '99.9%' // Cambia esto con la lógica real para obtener el tiempo de actividad
    };

    res.json(stats);
});
