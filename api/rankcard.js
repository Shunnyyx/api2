const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const axios = require('axios');

const app = express();

app.get('/api/rankcard', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username || 'User';
    const level = req.query.level || 1;
    const exp = parseInt(req.query.exp) || 0;
    const nextLevelExp = parseInt(req.query.nextLevelExp) || 1000;

    if (!userId) {
        return res.status(400).json({ error: 'Falta el userId' });
    }

    try {
        // Obtener el avatar del usuario desde la API de Discord
        const discordResponse = await axios.get(`https://discord.com/api/v9/users/${userId}`, {
            headers: {
                'Authorization': `Bot ${process.env.DISCORD_TOKEN}` // Asegúrate de tener el token correcto
            }
        });

        const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${discordResponse.data.avatar}.png?size=256`;

        // URL de fondo (reemplaza con tu propia imagen de fondo si es necesario)
        const backgroundUrl = 'https://images6.alphacoders.com/132/1327974.png';

        // Crear la tarjeta
        const width = 800;
        const height = 300;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Cargar y dibujar el fondo
        const background = await loadImage(backgroundUrl);
        ctx.drawImage(background, 0, 0, width, height);

        // Cargar y dibujar el avatar
        const avatar = await loadImage(avatarUrl);
        ctx.save();
        ctx.beginPath();
        ctx.arc(125, 150, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, 25, 50, 200, 200);
        ctx.restore();

        // Dibujar el nombre de usuario
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 40px Poppins';
        ctx.fillText(username, 250, 100);

        // Dibujar el nivel y la experiencia
        ctx.font = '30px Poppins';
        ctx.fillText(`Nivel: ${level}`, 250, 150);
        ctx.fillText(`XP: ${exp} / ${nextLevelExp}`, 250, 200);

        // Dibujar la barra de progreso
        const progressBarWidth = 500;
        const progress = (exp / nextLevelExp) * progressBarWidth;

        // Fondo de la barra de progreso
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(250, 220, progressBarWidth, 30);

        // Barra de progreso
        ctx.fillStyle = '#9c88ff';
        ctx.fillRect(250, 220, progress, 30);

        // Borde de la barra de progreso
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(250, 220, progressBarWidth, 30);

        // Enviar la imagen generada
        const buffer = canvas.toBuffer('image/png');
        res.set('Content-Type', 'image/png');
        res.send(buffer);
    } catch (err) {
        console.error('Error al generar la rank card:', err.response?.data || err.message);
        res.status(500).json({ error: 'Error al generar la rank card' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
