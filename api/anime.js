// api/anime.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router(); // Crear una instancia del router

// Ruta correcta para acceder a 'anime.json'
const animeDataPath = path.join(__dirname, '../app/anime.json'); // Asegúrate de que la ruta sea correcta

// Endpoint para obtener información del anime
router.get('/', (req, res) => {
    const { search } = req.query;

    if (!search) {
        return res.status(400).json({ error: 'Missing anime search parameter.' });
    }

    fs.readFile(animeDataPath, 'utf8', (err, data) => { // Cambiar a animeDataPath aquí
        if (err) {
            console.error('Error reading the data file:', err.message); // Mensaje de error detallado
            return res.status(500).json({ error: 'Error reading the data file.' });
        }

        let animeData;
        try {
            animeData = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error processing the data:', parseErr.message); // Mensaje de error detallado
            return res.status(500).json({ error: 'Error processing the data.' });
        }

        const anime = animeData.find(a => a.title.toLowerCase() === search.toLowerCase());
        if (!anime) {
            return res.status(404).json({ error: 'Anime not found.' });
        }

        res.json(anime); // Responder con el anime encontrado en formato JSON
    });
});

module.exports = router; // Exportar el router