const fs = require('fs');
const path = require('path');

const validKeys = [];

// Cargar todas las claves válidas al inicio
function loadValidKeys() {
  const files = ['db1.json', 'db2.json'];
  files.forEach(file => {
    const filePath = path.join(__dirname, '../database', file);
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(data);
      if (jsonData.keys) {
        validKeys.push(...jsonData.keys);
      }
    } catch (error) {
      console.error(`Error reading file ${file}: ${error.message}`);
    }
  });
}

loadValidKeys();

module.exports = (req, res) => {
  const apiKey = req.headers['api-key']; // Asume que la clave se envía en los encabezados

  if (!apiKey) {
    return res.status(400).json({ error: 'API key is required' });
  }

  if (validKeys.includes(apiKey)) {
    // La clave es válida, responder con éxito
    res.json({ message: 'API key is valid' });
  } else {
    // La clave no es válida, responder con error
    res.status(403).json({
      error: 'Invalid API key. Get a free key at https://discord.gg/vYHWyDd4Bp'
    });
  }
};
