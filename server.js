const express = require('express');
const cors = require('cors');  // Agrega esta línea
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());  // Agrega esta línea

// Variable para el conteo de solicitudes
let requestCount = 0;

// Middleware para contar solicitudes
app.use((req, res, next) => {
    requestCount++;
    next();
});

// Endpoint para obtener estadísticas (sólo solicitudes)
app.get('/api/stats', (req, res) => {
    const stats = {
        requestCount: requestCount,
    };
    res.json(stats);
});

// Otros endpoints
app.post('/api/morse', (req, res) => {
    // Lógica de codificación y decodificación
    const { action, message } = req.body;
    if (!action || !message) {
        return res.status(400).json({ error: 'Action and message are required' });
    }

    if (action === 'encode') {
        return res.json({ result: encodeToMorse(message) });
    } else if (action === 'decode') {
        return res.json({ result: decodeFromMorse(message) });
    } else {
        return res.status(400).json({ error: 'Invalid action. Use "encode" or "decode".' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
