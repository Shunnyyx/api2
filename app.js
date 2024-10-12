const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;

// Configura tu token de Vercel
const vercelToken = 'kerC5sEpBRywdZj2Vtn5zdze';

// Endpoint para obtener los logs de Vercel
app.get('/api/vercel-logs', async (req, res) => {
    try {
        const response = await axios.get('https://api.vercel.com/v1/projects/YOUR_PROJECT_ID/deployments', {
            headers: {
                Authorization: `Bearer ${vercelToken}`,
            },
        });

        // Procesa los logs según tu necesidad
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener los logs de Vercel:', error);
        res.status(500).json({ error: 'Error al obtener los logs' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
