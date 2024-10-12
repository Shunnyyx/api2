app.get('/api/stats', (req, res) => {
    const stats = {
        endpointsCount: endpointsCount,
        requestCount: requestCount,
        uptime: '99.9%' // Actualiza según corresponda
    };

    res.json(stats);
});
