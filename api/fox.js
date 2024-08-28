const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Leer el archivo JSON de zorros una vez al inicio
  const imagesPath = path.join(__dirname, '../images/fox.json');
  
  fs.readFile(imagesPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo de imágenes de zorros' });
    }

    const imagesData = JSON.parse(data);
    const foxImages = imagesData.fox;

    if (!foxImages || foxImages.length === 0) {
      return res.status(404).json({ error: 'No se encontraron imágenes de zorros' });
    }

    const randomFoxImage = foxImages[Math.floor(Math.random() * foxImages.length)];
    res.json({ url: randomFoxImage });
  });
};
