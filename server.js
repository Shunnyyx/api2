const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000; // Cambia el puerto si es necesario

// Función para verificar si una clave API es válida
const isValidApiKey = (key) => {
  const db1Path = path.join(__dirname, 'database', 'db1.json');
  const db2Path = path.join(__dirname, 'database', 'db2.json');

  try {
    const db1Data = fs.readFileSync(db1Path, 'utf-8');
    const db2Data = fs.readFileSync(db2Path, 'utf-8');
    const db1Keys = JSON.parse(db1Data).keys || [];
    const db2Keys = JSON.parse(db2Data).keys || [];

    // Verificar si la clave está en alguno de los archivos
    if (db1Keys.includes(key) || db2Keys.includes(key)) {
      return true;
    }
  } catch (err) {
    console.error('Error al leer los archivos de claves API:', err);
  }

  return false;
};

// Middleware para verificar la clave API
const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['api-key'] || req.query['key']; // Leer la clave API de los encabezados o de los parámetros de la URL
  
  if (!apiKey || !isValidApiKey(apiKey)) {
    return res.status(403).json({
      error: 'Invalid API key. Get a free key at https://discord.gg/vYHWyDd4Bp'
    });
  }

  next();
};

// Endpoint para obtener imágenes de gatos
app.get('/api/cat', verifyApiKey, (req, res) => {
  const imagesPath = path.join(__dirname, 'images', 'cat.json');

  fs.readFile(imagesPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading images file' });
    }

    const imagesData = JSON.parse(data);
    const catImages = imagesData.cats;

    if (!catImages || catImages.length === 0) {
      return res.status(404).json({ error: 'No cat images found' });
    }

    const randomCatImage = catImages[Math.floor(Math.random() * catImages.length)];
    res.json({ url: randomCatImage });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
