const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Leer el archivo JSON una vez al inicio
  const imagesPath = path.join(__dirname, '../images/hug.json');
  
  fs.readFile(imagesPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo de datos de abrazos de anime' });
    }

    const hugData = JSON.parse(data);
    const hugs = hugData.hug;

    if (!hugs || hugs.length === 0) {
      return res.status(404).json({ error: 'No se encontraron GIFs de abrazos de anime' });
    }

    const randomHug = hugs[Math.floor(Math.random() * hugs.length)];
    res.json(randomHug);
  });
};
