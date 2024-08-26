const { createCanvas } = require('canvas');

const generateColorImage = (color) => {
  const canvas = createCanvas(200, 200); // Tamaño de la imagen (200x200 px)
  const ctx = canvas.getContext('2d');

  // Rellenar el canvas con el color
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return canvas.toBuffer('image/png');
};

module.exports = (req, res) => {
  // Obtener el color de la consulta (query) o usar un color predeterminado
  const color = req.query.color || '#ffffff'; // Color blanco por defecto

  try {
    const imageBuffer = generateColorImage(color);
    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).json({ error: 'Error al generar la imagen del color' });
  }
};
