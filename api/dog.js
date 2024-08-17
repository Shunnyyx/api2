const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Leer el archivo JSON de perros una vez al inicio
  const imagesPath = path.join(__dirname, '../images/dog.json');
  
  fs.readFile(imagesPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo de imágenes de perros' });
    }

    const imagesData = JSON.parse(data);
    const dogImages = imagesData.dogs;

    if (!dogImages || dogImages.length === 0) {
      return res.status(404).json({ error: 'No se encontraron imágenes de perros' });
    }

    const randomDogImage = dogImages[Math.floor(Math.random() * dogImages.length)];
    res.json({ url: randomDogImage });
  });
};
