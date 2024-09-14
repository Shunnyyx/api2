const express = require('express');
const router = express.Router();

// Respuestas predefinidas del chatbot Aiko
const responses = {
    "what is your name": "I'm Aiko, created by Aiko™. How can I assist you today?",
    "how are you": "I'm just a bot, but I'm here to help you! How can I assist you?",
    "what can you do": "I can answer your questions and provide information. Just ask me anything!",
    "who created you": "I was created by Aiko™. Do you have any other questions?",
    "hello": "Hello! How can I help you today?",
    "bye": "Goodbye! Have a great day!",
    // Puedes agregar más respuestas aquí
};

// Endpoint del chatbot
router.get('/', (req, res) => {
    const message = req.query.msg ? req.query.msg.toLowerCase() : '';
    const responseMessage = responses[message] || "Sorry, I don't understand that question. Could you please rephrase it?";

    res.json({ response: responseMessage });
});

module.exports = router;
