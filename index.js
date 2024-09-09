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

// Rutas de tus endpoints
app.use('/api/cat', require('./api/cat'));
app.use('/api/dog', require('./api/dog'));

// Endpoint para obtener estadísticas del servicio
app.get('/api/stats', (req, res) => {
    const stats = {
        endpointsCount: 8, // Cambia esto según la cantidad real de endpoints
        userCount: 450, // Cambia esto con la lógica real para obtener el número de usuarios
        requestCount: requestCount,
        uptime: '99.9%' // Cambia esto con la lógica real para obtener el tiempo de actividad
    };

    res.json(stats);
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
