const Jimp = require('jimp');
const path = require('path');

// Ruta de la imagen "wanted" en el directorio api/images
const wantedImagePath = path.join(__dirname, 'images', 'wanted.png');

// Función para crear la imagen "wanted" con el avatar
const createWantedImage = async (avatarUrl) => {
    try {
        // Descargar la imagen del avatar desde la URL
        const avatar = await Jimp.read(avatarUrl);
        console.log('Avatar downloaded successfully from:', avatarUrl);

        // Cargar la imagen de fondo "wanted"
        const wantedImage = await Jimp.read(wantedImagePath);
        console.log('Wanted image loaded successfully from:', wantedImagePath);

        // Cambiar el tamaño del avatar a 280x280
        avatar.resize(280, 280);

        // Posicionar el avatar en el centro hacia abajo en la imagen "wanted"
        const avatarX = (wantedImage.bitmap.width / 2) - 140;
        const avatarY = wantedImage.bitmap.height - 460;

        // Combinar las dos imágenes (wanted + avatar)
        wantedImage.composite(avatar, avatarX, avatarY);

        // Convertir la imagen resultante a un buffer en formato PNG y devolverla
        const buffer = await wantedImage.getBufferAsync(Jimp.MIME_PNG);
        return buffer;
    } catch (error) {
        console.error('Error details:', error); // Log más detallado
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
