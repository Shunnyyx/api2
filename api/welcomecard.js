const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint para generar tarjeta de bienvenida
app.get('/welcomecard', async (req, res) => {
    const { background, avatar, name, welcomeText, memberCount } = req.query;

    if (!background || !avatar || !name || !welcomeText) {
        return res.status(400).json({ error: 'Missing required query parameters' });
    }

    try {
        const canvas = createCanvas(800, 400);
        const ctx = canvas.getContext('2d');

        // Cargar y dibujar el fondo
        const bg = await loadImage(background);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        // Cargar y dibujar el avatar
        const userAvatar = await loadImage(avatar);
        ctx.drawImage(userAvatar, 30, 30, 100, 100);

        // Configuración de estilos de texto
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';

        // Dibujar el nombre debajo del avatar
        ctx.fillText(decodeURIComponent(name), 80, 160);

        // Texto de bienvenida
        ctx.font = 'bold 30px Arial';
        ctx.fillText(decodeURIComponent(welcomeText), canvas.width / 2, 80);

        // Texto opcional
        if (memberCount) {
            ctx.font = '20px Arial';
            ctx.fillText(`Member ${decodeURIComponent(memberCount)}`, canvas.width / 2, 130);
        }

        // Convertir el canvas a imagen
        const buffer = canvas.toBuffer('image/png');
        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);

    } catch (error) {
        res.status(500).json({ error: 'Error generating the welcome card' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
