const fs = require('fs');
const path = require('path');
const cache = require('memory-cache');

const cacheKey = 'catImages';
const cacheDuration = 60000; // 1 minuto

const loadCatImages = () => {
  const imagesPath = path.join(__dirname, '../images/cat.json');

  fs.readFile(imagesPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de imágenes de gatos:', err);
      return;
    }

    try {
      const imagesData = JSON.parse(data);
      cache.put(cacheKey, imagesData.cats || [], cacheDuration);
    } catch (parseErr) {
      console.error('Error al analizar el archivo de imágenes de gatos:', parseErr);
    }
  });
};

// Cargar imágenes al iniciar el servidor
loadCatImages();

module.exports = (req, res) => {
  const catImages = cache.get(cacheKey);

  if (!catImages || catImages.length === 0) {
    return res.status(500).json({ error: 'No se han cargado imágenes de gatos' });
  }

  const randomCatImage = catImages[Math.floor(Math.random() * catImages.length)];
  res.json({ url: randomCatImage });
};
