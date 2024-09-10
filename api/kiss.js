const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Ruta al archivo JSON de besos
  const imagesPath = path.join(__dirname, '../images/kiss.json');
  
  // Lee el archivo JSON
  fs.readFile(imagesPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo de datos de besos' });
    }

    try {
      const kissData = JSON.parse(data);
      const kisses = kissData.kiss;

      if (!kisses || kisses.length === 0) {
        return res.status(404).json({ error: 'No se encontraron imágenes de besos' });
      }

      // Selecciona un beso aleatorio
      const randomKiss = kisses[Math.floor(Math.random() * kisses.length)];
      
      // Responde con el beso seleccionado
      res.json(randomKiss);

    } catch (parseError) {
      return res.status(500).json({ error: 'Error al parsear el archivo de datos de besos' });
    }
  });
};
