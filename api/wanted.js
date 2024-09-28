const { createCanvas, loadImage } = require('canvas');
const axios = require('axios');
const path = require('path');

// Ruta de la imagen "wanted"
const wantedImagePath = path.join(__dirname, 'images', 'wanted.png');

// Función para crear la imagen "wanted" con el avatar
const createWantedImage = async (avatarUrl) => {
    try {
        // Descargar la imagen del avatar
        const response = await axios({
            url: avatarUrl,
            responseType: 'arraybuffer',
        });
        const avatarBuffer = Buffer.from(response.data, 'binary');

        // Cargar las imágenes (wanted y avatar)
        const wantedImage = await loadImage(wantedImagePath);
        const avatarImage = await loadImage(avatarBuffer);

        // Crear el canvas con el tamaño de la imagen "wanted"
        const canvas = createCanvas(wantedImage.width, wantedImage.height);
        const ctx = canvas.getContext('2d');

        // Dibujar la imagen "wanted" en el canvas
        ctx.drawImage(wantedImage, 0, 0);

        // Definir la posición y tamaño del avatar sobre la imagen "wanted"
        const avatarSize = 280; // Aumentamos un poco el tamaño del avatar
        const avatarX = (canvas.width / 2) - (avatarSize / 2); // Centrar el avatar horizontalmente
        const avatarY = canvas.height - avatarSize - 180; // Mover el avatar más abajo en la imagen

        // Dibujar el avatar sobre la imagen "wanted"
        ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);

        // Devolver el buffer de la imagen generada
        return canvas.toBuffer();
    } catch (error) {
        throw new Error('Error generating the wanted image');
    }
};

// Exportar la función como un middleware de Express
module.exports = async (req, res) => {
    const avatarUrl = req.query.avatar;

    if (!avatarUrl) {
        return res.status(400).send('Error: Please provide an avatar URL using the ?avatar parameter.');
    }

    try {
        const imageBuffer = await createWantedImage(avatarUrl);
        res.setHeader('Content-Type', 'image/png');
        res.send(imageBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: Unable to generate the wanted image.');
    }
};
