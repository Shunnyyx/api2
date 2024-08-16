const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Leer el archivo JSON una vez al inicio
const imagesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../images/dog.json'), 'utf-8'));

// Endpoint para obtener una imagen aleatoria de perros
app.get('/', (req, res) => {
  const dogImages = imagesData.dogs;
  if (dogImages.length === 0) {
    return res.status(404).json({ error: 'No se encontraron imágenes de perros' });
  }

  const randomDogImage = dogImages[Math.floor(Math.random() * dogImages.length)];
  res.json({ url: randomDogImage });
});

module.exports = app;
