const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Ruta al archivo panda.json
  const imagesPath = path.join(__dirname, '../images/panda.json');
  
  fs.readFile(imagesPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo de imágenes de pandas' });
    }

    const imagesData = JSON.parse(data);
    const pandaImages = imagesData.pandas;

    if (!pandaImages || pandaImages.length === 0) {
      return res.status(404).json({ error: 'No se encontraron imágenes de pandas' });
    }

    // Selecciona una imagen de panda aleatoria
    const randomPandaImage = pandaImages[Math.floor(Math.random() * pandaImages.length)];
    res.json({ url: randomPandaImage });
  });
};
