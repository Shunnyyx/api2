const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config(); // Para manejar las variables de entorno

// Crear servidor HTTP
const server = http.createServer(app);

// Crear servidor WebSocket
const wss = new WebSocket.Server({ server });

// Variables globales para estadísticas
let requestCount = 0; // Contador de solicitudes
let userCount = 450;  // Número de usuarios
let endpointsCount = 6; // Número de endpoints
let uptime = '99.9%';  // Simulación del uptime del servidor

// Middleware para contar solicitudes
app.use(express.json());
app.use((req, res, next) => {
    requestCount++;
    next();
});

// Importar y usar routers para cat, dog y chatbot
app.use('/api/cat', require('./api/cat'));
app.use('/api/dog', require('./api/dog'));
app.use('/api/chatbot', require('./api/chatbot'));

// Endpoint de estadísticas
app.get('/api/stats', (req, res) => {
    const stats = {
        endpointsCount,
        userCount,
        requestCount,
        uptime
    };
    res.json(stats);
});

// Manejo de conexiones WebSocket
wss.on('connection', ws => {
    console.log('Nueva conexión WebSocket');

    // Enviar estadísticas iniciales al cliente conectado
    ws.send(JSON.stringify({
        endpointsCount,
        userCount,
        requestCount,
        uptime
    }));

    // Enviar estadísticas periódicamente cada 30 segundos
    const interval = setInterval(() => {
        ws.send(JSON.stringify({
            endpointsCount,
            userCount,
            requestCount,
            uptime
        }));
    }, 30000); // Cada 30 segundos

    // Limpiar el intervalo cuando se cierre la conexión
    ws.on('close', () => {
        clearInterval(interval);
    });

    // Manejar errores en WebSocket
    ws.on('error', (error) => {
        console.error('Error en WebSocket:', error);
    });
});

// Manejo de errores globales en Express
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Iniciar servidor
server.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
