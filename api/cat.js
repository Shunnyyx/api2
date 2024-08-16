const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Leer el archivo JSON una vez al inicio
const imagesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../images/cat.json'), 'utf-8'));

// Endpoint para obtener una imagen aleatoria de gatos
app.get('/', (req, res) => {
  const catImages = imagesData.cats;
  if (catImages.length === 0) {
    return res.status(404).json({ error: 'No se encontraron imágenes de gatos' });
  }

  const randomCatImage = catImages[Math.floor(Math.random() * catImages.length)];
  res.json({ url: randomCatImage });
});

module.exports = app;
