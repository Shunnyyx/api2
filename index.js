const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Contador de solicitudes
let requestCount = 0;

// Middleware para contar solicitudes
app.use((req, res, next) => {
    requestCount++;
    next();
});

// Configuración de tus rutas
const catRouter = require('./api/cat');
const dogRouter = require('./api/dog');

// Usa las rutas
app.use('/api/cat', catRouter);
app.use('/api/dog', dogRouter);

// Endpoint para obtener estadísticas del servicio
app.get('/api/stats', (req, res) => {
    // Obtener los endpoints registrados automáticamente
    const endpoints = Object.keys(app._router.stack)
        .filter(r => r.route)
        .map(r => r.route.path);

    // Contar los endpoints
    const endpointsCount = endpoints.length;

    // Preparar la respuesta de estadísticas
    const stats = {
        endpointsCount: endpointsCount,
        requestCount: requestCount,
        uptime: '99.9%' // Esto es un valor estático, cámbialo según corresponda
    };

    res.json(stats);
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
