const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Endpoint para obtener información de un anime
app.get('/anime', async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: 'Falta el parámetro de nombre del anime.' });
    }

    try {
        // Llamada a la API de Jikan
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(name)}&limit=1`);
        const anime = response.data.data[0];

        if (!anime) {
            return res.status(404).json({ error: 'Anime no encontrado.' });
        }

        // Responder con la información del anime
        res.json({
            title: anime.title,
            image_url: anime.images.jpg.image_url,
            synopsis: anime.synopsis,
            episodes: anime.episodes,
            score: anime.score
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener información del anime.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor API en http://localhost:${port}`);
});
