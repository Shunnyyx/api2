// utils.js
const fs = require('fs');
const path = require('path');

function getRandomImage(imagesPath, res) {
  const imagesData = JSON.parse(fs.readFileSync(imagesPath, 'utf-8'));
  const images = imagesData.cats || imagesData.dogs || [];

  if (images.length === 0) {
    return res.status(404).json({ error: "No se encontraron imágenes" });
  }

  const randomImage = images[Math.floor(Math.random() * images.length)];
  return randomImage;
}

module.exports = { getRandomImage };
