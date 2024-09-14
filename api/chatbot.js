const express = require('express');
const { NlpManager } = require('node-nlp');
const app = express();

// Crear una instancia del NLP Manager
const manager = new NlpManager({ languages: ['en', 'es'], nlu: { log: false } });

// Entrenar al bot con algunos ejemplos
(async () => {
    // Entrenamiento en inglés
    manager.addDocument('en', 'Hi', 'greeting');
    manager.addDocument('en', 'Hello', 'greeting');
    manager.addDocument('en', 'How are you?', 'greeting');
    manager.addDocument('en', 'Tell me a joke', 'joke');

    // Entrenamiento en español
    manager.addDocument('es', 'Hola', 'greeting');
    manager.addDocument('es', '¿Cómo estás?', 'greeting');
    manager.addDocument('es', 'Cuéntame un chiste', 'joke');

    // Respuestas para el bot
    manager.addAnswer('en', 'greeting', 'Hello! I am 9INE, developed by Aiko™. How can I assist you today?');
    manager.addAnswer('en', 'joke', 'Why did the scarecrow win an award? Because he was outstanding in his field!');

    manager.addAnswer('es', 'greeting', '¡Hola! Soy 9INE, desarrollado por Aiko™. ¿Cómo puedo asistirte hoy?');
    manager.addAnswer('es', 'joke', '¿Por qué el espantapájaros ganó un premio? Porque era sobresaliente en su campo.');

    await manager.train();
    manager.save();
})();

app.use(express.json());

// Middleware para filtrar contenido inapropiado
const badWords = ['badword1', 'badword2']; // Añade las palabras que quieres filtrar

function filterText(text) {
    let filteredText = text;
    badWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        filteredText = filteredText.replace(regex, '[censored]');
    });
    return filteredText;
}

// Endpoint del chatbot
app.get('/', async (req, res) => {
    const message = req.query.message;
    if (!message) {
        return res.json({ error: 'No message provided' });
    }

    // Filtrar mensaje del usuario
    const filteredMessage = filterText(message);

    // Obtener respuesta del bot
    const response = await manager.process(filteredMessage);

    // Filtrar respuesta del bot
    const filteredResponse = filterText(response.answer);

    res.json({ response: filteredResponse });
});

module.exports = app;
