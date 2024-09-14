const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Para manejar JSON en el cuerpo de la solicitud

// Ruta base para los endpoints
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

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
