const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const chatbotDataPath = path.join(__dirname, '..', 'app', 'chatbot.json');
let chatbotData;

// Leer el archivo JSON al iniciar la aplicación
fs.readFile(chatbotDataPath, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo JSON del chatbot:', err);
        process.exit(1); // Salir si hay un error al leer el archivo
    }
    chatbotData = JSON.parse(data);
});

// Middleware para manejar JSON
app.use(express.json());

// Middleware para filtrar contenido inapropiado
function filterText(text) {
    if (!chatbotData || !chatbotData.badWords) return text;
    
    let filteredText = text;
    chatbotData.badWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        filteredText = filteredText.replace(regex, '[censored]');
    });
    return filteredText;
}

// Endpoint del chatbot
app.get('/', (req, res) => {
    try {
        const message = req.query.message;
        const language = req.query.language || 'en'; // Usa inglés por defecto

        if (!message) {
            return res.status(400).json({ error: 'No message provided' });
        }

        // Filtrar mensaje del usuario
        const filteredMessage = filterText(message);

        // Obtener respuesta del bot
        const response = chatbotData.responses[language] || {};
        const botResponse = response[filteredMessage] || 'I\'m sorry, I don\'t understand that request.';

        // Filtrar respuesta del bot
        const filteredResponse = filterText(botResponse);

        // Enviar respuesta en formato JSON
        res.json({ response: filteredResponse });
    } catch (error) {
        console.error('Error en el endpoint del chatbot:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app;
