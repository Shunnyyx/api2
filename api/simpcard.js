const { createCanvas, loadImage } = require('canvas');
const path = require('path');

// Ruta de la imagen "simpcard" en el directorio 'public'
const simpcardImagePath = path.join(__dirname, 'assets', 'simpcard.png');

// Función para crear la imagen "simpcard" con el avatar
const createSimpcardImage = async (avatarUrl) => {
    try {
        // Cargar la imagen del avatar desde la URL
        const avatar = await loadImage(avatarUrl);
        const simpcard = await loadImage(simpcardImagePath);

        // Crear un canvas con el tamaño de la tarjeta simp
        const canvas = createCanvas(simpcard.width, simpcard.height);
        const ctx = canvas.getContext('2d');

        // Dibujar la tarjeta simp en el canvas
        ctx.drawImage(simpcard, 0, 0);

        // Redimensionar el avatar (más alto para estirarlo hacia abajo)
        const avatarWidth = 190;
        const avatarHeight = 285; // Altura aumentada para estirar hacia abajo
        const avatarX = 35; // Posición horizontal (X)
        const avatarY = 62; // Posición vertical (Y), puedes ajustarlo según sea necesario

        // Dibujar el avatar estirado en el canvas
        ctx.drawImage(avatar, avatarX, avatarY, avatarWidth, avatarHeight);

        // Devolver la imagen resultante como buffer PNG
        return canvas.toBuffer();
    } catch (error) {
        console.error('Error al generar la imagen simpcard:', error);
        throw new Error('Error generating the simpcard image: ' + error.message);
    }
};

module.exports = async (req, res) => {
    const avatarUrl = req.query.avatar;

    if (!avatarUrl) {
        return res.status(400).send('Error: Please provide an avatar URL using the ?avatar parameter.');
    }

    try {
        const imageBuffer = await createSimpcardImage(avatarUrl);
        res.setHeader('Content-Type', 'image/png');
        res.send(imageBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: Unable to generate the simpcard image: ' + error.message);
    }
};
