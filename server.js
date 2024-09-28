// Importar las dependencias necesarias
const express = require('express');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const cache = require('memory-cache');

// Inicializar la aplicación Express
const app = express();
const port = process.env.PORT || 2000;

// Rutas de imágenes de gatos
const imagesPath = path.join(__dirname, 'images', 'cat.json');
const cacheKey = 'catImages';
const cacheDuration = 60000; // 1 minuto

// Middleware para comprimir las respuestas
app.use(compression());
app.use(express.json()); // Para manejar JSON en el cuerpo de la solicitud

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Servir la página principal (index.html) en la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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

// Lee todos los archivos en la carpeta '/api' y los carga como rutas
fs.readdirSync(path.join(__dirname, 'api')).forEach(file => {
  if (file.endsWith('.js')) {
    const route = require(`./api/${file}`);
    const routeName = `/${path.basename(file, '.js')}`;

    // Verificar si el archivo exporta un router o un handler válido
    if (typeof route === 'function') {
      apiRouter.use(routeName, route); // Usar si es una función
    } else if (typeof route === 'object' && typeof route.handler === 'function') {
      apiRouter.use(routeName, route.handler); // Usar si es un objeto con un 'handler'
    } else if (route instanceof express.Router) {
      apiRouter.use(routeName, route); // Usar si es un router
    } else {
      console.error(`Error al cargar la ruta ${routeName}: no es una función ni un router válido.`);
    }
  }
});

// Usar el apiRouter para manejar todas las rutas dentro de '/api'
app.use('/api', apiRouter);

// Middleware de manejo de errores para 404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
