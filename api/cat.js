const path = require('path');
const fs = require('fs');

// Leer el archivo JSON una vez al inicio
const imagesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../images/cat.json'), 'utf-8'));

module.exports = (req, res) => {
  const catImages = imagesData.cats;
  if (catImages.length === 0) {
    return res.status(404).json({ error: 'No se encontraron imágenes de gatos' });
  }

  const randomCatImage = catImages[Math.floor(Math.random() * catImages.length)];
  res.json({ url: randomCatImage });
};
