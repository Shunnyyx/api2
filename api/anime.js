const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Servir archivos estáticos
app.use('/static', express.static(path.join(__dirname, 'static')));

// Endpoint para obtener información de un anime
app.get('/api/anime', (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: 'Falta el parámetro de nombre del anime.' });
    }

    // Leer el archivo JSON de animes
    const filePath = path.join(__dirname, 'app', 'anime.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo de datos.' });
        }

        const animeData = JSON.parse(data);
        const anime = animeData.find(a => a.title.toLowerCase() === name.toLowerCase());

        if (!anime) {
            return res.status(404).json({ error: 'Anime no encontrado.' });
        }

        res.json(anime);
    });
});

// Servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'anime.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
