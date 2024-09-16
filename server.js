const express = require('express');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const cache = require('memory-cache');

const app = express();
const port = 3000; // Cambia el puerto si es necesario

const imagesPath = path.join(__dirname, 'images', 'cat.json');
const cacheKey = 'catImages';
const cacheDuration = 60000; // 1 minuto

// Middleware para comprimir las respuestas
app.use(compression());

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
      cache.put(cacheKey, catImages, cacheDuration);
    } catch (parseErr) {
      console.error('Error al analizar el archivo de imágenes de gatos:', parseErr);
    }
  });
};

// Cargar imágenes al iniciar el servidor
loadCatImages();

// Endpoint para obtener imágenes de gatos
app.get('/api/cat', (req, res) => {
  const catImages = cache.get(cacheKey);

  if (!catImages || catImages.length === 0) {
    return res.status(500).json({ error: 'No se han cargado imágenes de gatos' });
  }

  const randomCatImage = catImages[Math.floor(Math.random() * catImages.length)];
  res.json({ url: randomCatImage });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
