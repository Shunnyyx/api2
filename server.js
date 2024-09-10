const express = require('express');
const redis = require('redis');
const app = express();
const port = 3000;

// Configura Redis
const client = redis.createClient();
client.on('error', (err) => {
    console.error('Error de Redis:', err);
});

// Middleware para contar solicitudes
app.use((req, res, next) => {
    const endpoint = req.originalUrl;

    // Incrementa el contador de solicitudes para el endpoint
    client.incr(`requests:${endpoint}`, (err) => {
        if (err) {
            console.error('Error al incrementar el contador:', err);
        }
        next();
    });
});

// Endpoint para obtener el conteo de solicitudes
app.get('/api/requests-count', (req, res) => {
    const endpoint = req.query.endpoint || '/';
    
    // Obtiene el contador de solicitudes
    client.get(`requests:${endpoint}`, (err, count) => {
        if (err) {
            console.error('Error al obtener el contador:', err);
            res.status(500).send('Error del servidor');
        } else {
            res.json({ requestCount: count || 0 });
        }
    });
});

// Ejemplo de endpoints
app.get('/api/cat', (req, res) => {
    res.send('Endpoint de gatos');
});

app.get('/api/dog', (req, res) => {
    res.send('Endpoint de perros');
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
