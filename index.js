const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Variable para contar los requests recibidos
let requestCount = 0;

// Lista de los endpoints
const endpoints = [
    { method: 'GET', path: '/api/cat' },
    { method: 'GET', path: '/api/dog' },
    // Puedes agregar más endpoints aquí si tienes otros
];

// Middleware para contar los requests
app.use((req, res, next) => {
    requestCount++;
    next();
});

// Define tus rutas existentes
app.use('/api/cat', require('./api/cat'));
app.use('/api/dog', require('./api/dog'));

// Endpoint para mostrar las estadísticas
app.get('/stats', (req, res) => {
    res.json({
        requestCount,           // Número total de requests recibidos
        endpointCount: endpoints.length, // Número de endpoints disponibles
        endpoints               // Lista de los endpoints
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
