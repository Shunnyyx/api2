const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ruta al archivo JSON
const responseFilePath = path.join(__dirname, '../app/response.json');

// Cargar respuestas desde el archivo JSON
let responses = {};
try {
    responses = JSON.parse(fs.readFileSync(responseFilePath, 'utf-8'));
} catch (error) {
    console.error('Error al leer el archivo de respuestas:', error);
    responses = {
        "default": "Sorry, I don't understand that question."
    };
}

// Endpoint para el chatbot
router.get('/', (req, res) => {
    const msg = req.query.msg ? req.query.msg.toLowerCase() : '';
    const response = responses[msg] || responses["default"];
    res.json({ response });
});

module.exports = router;
