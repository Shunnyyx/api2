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

app.use((req, res, next) => {
    requestCount++;
    next();
});

app.use('/api/cat', require('./api/cat'));
app.use('/api/dog', require('./api/dog'));

app.get('/api/stats', (req, res) => {
    const stats = {
        endpointsCount: 6, // Cambia esto según corresponda
        userCount: 450, // Cambia esto según corresponda
        requestCount: requestCount,
        uptime: '99.9%' // Cambia esto según corresponda
    };

    res.json(stats);
});

// Manejar conexiones WebSocket
wss.on('connection', ws => {
    console.log('New WebSocket connection');

    // Enviar estadísticas al cliente conectado
    ws.send(JSON.stringify({
        endpointsCount: 6,
        userCount: 450,
        requestCount: requestCount,
        uptime: '99.9%'
    }));

    // Enviar estadísticas periódicamente
    const interval = setInterval(() => {
        ws.send(JSON.stringify({
            endpointsCount: 6,
            userCount: 450,
            requestCount: requestCount,
            uptime: '99.9%'
        }));
    }, 30000); // Cada 30 segundos

    ws.on('close', () => {
        clearInterval(interval);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
