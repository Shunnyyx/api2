const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const cache = require('memory-cache');

const imagesPath = path.join(__dirname, '../images/cat.json');
const cacheKey = 'catImages';
const cacheDuration = 60000; // 1 minuto

// Función para cargar imágenes de gatos en memoria
const loadCatImages = () => {
  fs.readFile(imagesPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de imágenes de gatos:', err);
      return;
    }

    try {
      const imagesData = JSON.parse(data);
      const catImages = imagesData.cats || [];
      if (catImages.length === 0) {
        console.warn('El archivo JSON no contiene imágenes de gatos');
      }
      cache.put(cacheKey, catImages, cacheDuration);
    } catch (parseErr) {
      console.error('Error al analizar el archivo de imágenes de gatos:', parseErr);
    }
  });
};

// Cargar imágenes al iniciar el módulo
loadCatImages();

// Endpoint para obtener imágenes de gatos
router.get('/', (req, res) => {
  const catImages = cache.get(cacheKey);

  if (!catImages || catImages.length === 0) {
    return res.status(500).json({ error: 'No se han cargado imágenes de gatos' });
  }

  const randomCatImage = catImages[Math.floor(Math.random() * catImages.length)];
  res.json({ url: randomCatImage });
});

module.exports = router;
