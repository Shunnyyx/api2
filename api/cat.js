const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Leer el archivo JSON de gatos
  const imagesPath = path.join(__dirname, '../images/cat.json');
  
  fs.readFile(imagesPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo de imágenes de gatos' });
    }

    let imagesData;
    try {
      imagesData = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).json({ error: 'Error al analizar el archivo de imágenes de gatos' });
    }

    const catImages = imagesData.cats;

    if (!catImages || catImages.length === 0) {
      return res.status(404).json({ error: 'No se encontraron imágenes de gatos' });
    }

    const randomCatImage = catImages[Math.floor(Math.random() * catImages.length)];
    res.json({ url: randomCatImage });
  });
};
