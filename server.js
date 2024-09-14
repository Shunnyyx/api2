const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Importar las rutas de la API
const weatherRoutes = require('./api/weather');
app.use('/api/weather', weatherRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
