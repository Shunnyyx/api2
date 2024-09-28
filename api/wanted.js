const { createCanvas, loadImage } = require('canvas');
const path = require('path');

// Ruta de la imagen "wanted" en el directorio api/images
const wantedImagePath = path.join(__dirname, 'images', 'wanted.png');

// Función para crear la imagen "wanted" con el avatar
const createWantedImage = async (avatarUrl) => {
    try {
        // Cargar la imagen de fondo "wanted"
        const wantedImage = await loadImage(wantedImagePath);
        const canvas = createCanvas(wantedImage.width, wantedImage.height);
        const ctx = canvas.getContext('2d');

        // Dibujar la imagen de fondo
        ctx.drawImage(wantedImage, 0, 0);

        // Cargar el avatar desde la URL
        const avatar = await loadImage(avatarUrl);
        
        // Cambiar el tamaño del avatar a 280x280
        const avatarSize = 280;
        ctx.drawImage(avatar, (canvas.width / 2) - (avatarSize / 2), canvas.height - 460, avatarSize, avatarSize);

        // Obtener el buffer de la imagen resultante
        const buffer = canvas.toBuffer('image/png');
        return buffer;
    } catch (error) {
        console.error('Error details:', error);
        throw new Error('Error generating the wanted image: ' + error.message);
    }
};

// Endpoint para manejar la solicitud y generar la imagen "wanted"
module.exports = async (req, res) => {
    const avatarUrl = req.query.avatar;

    // Verificar que se haya proporcionado una URL de avatar
    if (!avatarUrl) {
        return res.status(400).send('Error: Please provide an avatar URL using the ?avatar parameter.');
    }

    try {
        // Crear la imagen "wanted" con el avatar proporcionado
        const imageBuffer = await createWantedImage(avatarUrl);

        // Establecer el encabezado de tipo de contenido para PNG
        res.setHeader('Content-Type', 'image/png');

        // Enviar la imagen generada como respuesta
        res.send(imageBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: Unable to generate the wanted image: ' + error.message);
    }
};
