const createWantedImage = async (avatarUrl) => {
    try {
        // Descargar la imagen del avatar desde la URL
        const avatar = await Jimp.read(avatarUrl);
        const wantedImage = await Jimp.read(wantedImagePath);

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
        console.error('Detailed error:', error); // Agrega esta línea
        throw new Error('Error generating the wanted image');
    }
};
