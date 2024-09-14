const express = require('express');
const path = require('path');
const fs = require('fs');

// Importar el endpoint de la tarjeta de bienvenida
const welcomecard = require('./api/welcomecard');

const app = express();
const port = 3000;
const dataDirectory = path.join(__dirname, 'data');
const imagesDirectory = path.join(__dirname, 'generated_images');

// Middleware para manejar JSON
app.use(express.json());

// Middleware para servir imágenes generadas
app.use('/generated_images', express.static(imagesDirectory));

// Función para crear rutas dinámicamente
function createDynamicRoutes() {
  fs.readdir(dataDirectory, (err, files) => {
    if (err) {
      console.error('Error al leer el directorio de datos:', err);
      return;
    }

    files.forEach(file => {
      if (path.extname(file) === '.json') {
        const endpointName = path.basename(file, '.json');
        const filePath = path.join(dataDirectory, file);

        app.get(`/api/${endpointName}`, (req, res) => {
          fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
              return res.status(500).json({ error: `Error al leer el archivo de datos ${endpointName}` });
            }

            try {
              const jsonData = JSON.parse(data);
              const items = jsonData[endpointName];

              if (!items || items.length === 0) {
                return res.status(404).json({ error: `No se encontraron datos para ${endpointName}` });
              }

              const randomItem = items[Math.floor(Math.random() * items.length)];
              res.json(randomItem);

            } catch (parseError) {
              return res.status(500).json({ error: `Error al parsear el archivo de datos ${endpointName}` });
            }
          });
        });
      }
    });
  });
}

// Crear rutas dinámicamente
createDynamicRoutes();

// Usar el endpoint de la tarjeta de bienvenida
app.use('/api', welcomecard);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
