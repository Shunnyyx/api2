const express = require('express');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const cache = require('memory-cache');

const app = express();
const port = process.env.PORT || 3000;

// Rutas de imágenes de gatos
const imagesPath = path.join(__dirname, 'images', 'cat.json');
const cacheKey = 'catImages';
const cacheDuration = 60000; // 1 minuto

// Middleware para comprimir las respuestas
app.use(compression());
app.use(express.json()); // Para manejar JSON en el cuerpo de la solicitud

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

// Cargar imágenes de gatos al iniciar el servidor
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

// Ruta base para los endpoints dinámicos
const apiRouter = express.Router();

// Lee todos los archivos en la carpeta '/api'
fs.readdirSync(path.join(__dirname, 'api')).forEach(file => {
  if (file.endsWith('.js')) {
    const route = require(`./api/${file}`);
    const routeName = `/${path.basename(file, '.js')}`;
    apiRouter.use(routeName, route);
  }
});

// Usa el enrutador de la API
app.use('/api', apiRouter);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error inesperado:', err);
  res.status(500).json({ error: 'Error inesperado en el servidor' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
