const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Ruta al archivo JSON que almacenará el conteo
const statsFilePath = path.join(__dirname, 'stats.json');

// Inicializa el archivo JSON si no existe
if (!fs.existsSync(statsFilePath)) {
    fs.writeFileSync(statsFilePath, JSON.stringify({
        '/api/cat': 0,
        '/api/dog': 0,
        '/api/bird': 0,
        '/api/fox': 0,
        '/api/hug': 0,
        '/api/anime': 0
    }, null, 2));
}

// Middleware para contar solicitudes a cada endpoint
app.use((req, res, next) => {
    const endpoint = req.path;
    
    // Lee el archivo JSON
    fs.readFile(statsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            return next();
        }
        
        const stats = JSON.parse(data);
        
        // Incrementa el conteo para el endpoint
        if (stats[endpoint] !== undefined) {
            stats[endpoint]++;
        }

        // Escribe el archivo JSON con el nuevo conteo
        fs.writeFile(statsFilePath, JSON.stringify(stats, null, 2), (err) => {
            if (err) {
                console.error('Error al escribir el archivo JSON:', err);
            }
            next();
        });
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
    fs.readFile(statsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            res.status(500).send('Error del servidor');
            return;
        }

        res.json(JSON.parse(data));
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
