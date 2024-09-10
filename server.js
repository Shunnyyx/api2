const express = require('express');
const app = express();
const port = 3000;

let requestCount = 0;

// Middleware para contar solicitudes
app.use((req, res, next) => {
    requestCount++;
    next();
});

// Endpoint para obtener el conteo de solicitudes
app.get('/api/requests-count', (req, res) => {
    res.json({ requestCount });
});

// Endpoint de prueba
app.get('/api/test', (req, res) => {
    res.send('Test endpoint');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
