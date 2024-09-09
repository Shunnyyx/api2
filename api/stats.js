app.get('/api/stats', (req, res) => {
    const stats = {
        endpointsCount: 8, // Cambia esto según la cantidad real de endpoints
        userCount: 450, // Cambia esto con la lógica real para obtener el número de usuarios
        requestCount: requestCount,
        uptime: '99.9%' // Cambia esto con la lógica real para obtener el tiempo de actividad
    };

    res.json(stats);
});
