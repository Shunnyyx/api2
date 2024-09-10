const express = require('express');
const redis = require('redis');
const app = express();
const port = 3000;

// Configura Redis
const client = redis.createClient();
client.on('error', (err) => {
    console.error('Error de Redis:', err);
});

// Middleware para contar solicitudes a cada endpoint
app.use((req, res, next) => {
    const endpoint = req.path;
    client.incr(`requests:${endpoint}`, (err) => {
        if (err) {
            console.error('Error al incrementar el contador:', err);
        }
        next();
    });
});

// Endpoints de la API
app.get('/api/cat', (req, res) => {
    res.send('Endpoint de gatos');
});

app.get('/api/dog', (req, res) => {
    res.send('Endpoint de perros');
});

app.get('/api/bird', (req, res) => {
    res.send('Endpoint de pájaros');
});

app.get('/api/fox', (req, res) => {
    res.send('Endpoint de zorros');
});

app.get('/api/hug', (req, res) => {
    res.send('Endpoint de abrazos');
});

app.get('/api/anime', (req, res) => {
    res.send('Endpoint de búsqueda de anime');
});

// Endpoint para obtener el conteo total de solicitudes
app.get('/api/requests-count', (req, res) => {
    client.keys('requests:*', (err, keys) => {
        if (err) {
            console.error('Error al obtener las claves:', err);
            res.status(500).send('Error del servidor');
            return;
        }

        const multi = client.multi();
        keys.forEach(key => multi.get(key));
        
        multi.exec((err, replies) => {
            if (err) {
                console.error('Error al obtener los valores:', err);
                res.status(500).send('Error del servidor');
                return;
            }

            const counts = {};
            keys.forEach((key, index) => {
                const endpoint = key.replace('requests:', '');
                counts[endpoint] = replies[index] || 0;
            });

            res.json(counts);
        });
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
