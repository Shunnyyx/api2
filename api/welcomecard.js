const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const axios = require('axios'); // Asegúrate de que axios esté en tus dependencias
const router = express.Router();

router.get('/welcomecard', async (req, res) => {
    const { background, avatar, name, welcomeText, memberCount } = req.query;

    // Validar parámetros obligatorios
    if (!background || !avatar || !name || !welcomeText) {
        return res.status(400).json({ error: 'Faltan parámetros obligatorios' });
    }

    try {
        // Crear canvas
        const canvas = createCanvas(800, 400);
        const ctx = canvas.getContext('2d');

        // Cargar y dibujar el fondo
        const bgResponse = await axios.get(background, { responseType: 'arraybuffer' });
        const bgImage = await loadImage(bgResponse.data);
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

        // Cargar y dibujar el avatar
        const avatarResponse = await axios.get(avatar, { responseType: 'arraybuffer' });
        const avatarImage = await loadImage(avatarResponse.data);
        ctx.drawImage(avatarImage, 30, 30, 100, 100);

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
        console.error('Error al generar la tarjeta de bienvenida:', error);
        res.status(500).json({ error: 'Error al generar la tarjeta de bienvenida' });
    }
});

module.exports = router;
