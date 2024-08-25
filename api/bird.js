const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Leer el archivo JSON una vez al inicio
  const imagesPath = path.join(__dirname, '../images/bird.json');
  
  fs.readFile(imagesPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo de imágenes' });
    }

    const imagesData = JSON.parse(data);
    const birdImages = imagesData.birds;

    if (!birdImages || birdImages.length === 0) {
      return res.status(404).json({ error: 'No se encontraron imágenes de gatos' });
    }

    const randomBirdImage = birdImages[Math.floor(Math.random() * birdImages.length)];
    res.json({ url: randomCatImage });
  });
};
