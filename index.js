const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const port = process.env.PORT || 3000;

// Crear servidor HTTP
const server = http.createServer(app);

// Crear servidor WebSocket
const wss = new WebSocket.Server({ server });

let requestCount = 0;

// Middleware para contar solicitudes
app.use((req, res, next) => {
    requestCount++;
    next();
});

// Importar y usar routers para cat y dog
app.use('/api/cat', require('./api/cat'));
app.use('/api/dog', require('./api/dog'));

// Endpoint de estadísticas
app.get('/api/stats', (req, res) => {
    const stats = {
        endpointsCount: 6, // Actualiza esto según el número real de endpoints
        userCount: 450, // Actualiza esto según el número real de usuarios
        requestCount: requestCount,
        uptime: '99.9%' // Actualiza esto según el uptime real
    };

    res.json(stats);
});

// Manejo de conexiones WebSocket
wss.on('connection', ws => {
    console.log('Nueva conexión WebSocket');

    // Enviar estadísticas al cliente conectado
    ws.send(JSON.stringify({
        endpointsCount: 6, // Actualiza según el número real de endpoints
        userCount: 450, // Actualiza según el número real de usuarios
        requestCount: requestCount,
        uptime: '99.9%' // Actualiza según el uptime real
    }));

    // Enviar estadísticas periódicamente
    const interval = setInterval(() => {
        ws.send(JSON.stringify({
            endpointsCount: 6, // Actualiza según el número real de endpoints
            userCount: 450, // Actualiza según el número real de usuarios
            requestCount: requestCount,
            uptime: '99.9%' // Actualiza según el uptime real
        }));
    }, 30000); // Cada 30 segundos

    ws.on('close', () => {
        clearInterval(interval);
    });
});

// Iniciar servidor
server.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
