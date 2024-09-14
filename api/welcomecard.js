const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const outputDir = path.join(__dirname, 'generated_images');

// Asegúrate de que el directorio para imágenes generadas exista
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

router.get('/welcomecard', async (req, res) => {
    const { background, avatar, name, welcomeText, memberCount } = req.query;

    // Validar parámetros obligatorios
    if (!background || !avatar || !name || !welcomeText) {
        return res.status(400).json({ error: 'Faltan parámetros obligatorios' });
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

        // Guardar la imagen en el directorio
        const timestamp = Date.now();
        const filePath = path.join(outputDir, `welcomecard_${timestamp}.png`);
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(filePath, buffer);

        // Devolver la URL de la imagen generada
        const imageUrl = `https://api.aiko.top/generated_images/welcomecard_${timestamp}.png`;
        res.json({ imageUrl });

    } catch (error) {
        console.error('Error al generar la tarjeta de bienvenida:', error);
        res.status(500).json({ error: 'Error al generar la tarjeta de bienvenida' });
    }
});

module.exports = router;
