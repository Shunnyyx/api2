const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
require('dotenv').config(); // Para manejar las variables de entorno

// Verifica que la clave API esté configurada
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Tu clave API de OpenAI
});

// Diccionario de respuestas personalizadas
const customResponses = {
  "what is your name": "I'm Aiko, created by Aiko™. How can I assist you today?",
  "how are you": "I'm just a bot, but I'm here to help you! How can I assist you?",
  "what can you do": "I can answer your questions and provide information. Just ask me anything!",
  "default": "Sorry, I don't understand that question."
};

// Endpoint del chatbot
router.post('/', async (req, res) => {
  // Verifica que req.body.message esté presente
  if (!req.body.message || typeof req.body.message !== 'string') {
    return res.status(400).json({ response: "Invalid request. Please provide a valid message." });
  }

  const userMessage = req.body.message.toLowerCase();
  let responseText;

  if (customResponses[userMessage]) {
    responseText = customResponses[userMessage];
  } else {
    // Consulta a la API de OpenAI si no hay una respuesta personalizada
    try {
      const response = await openai.completions.create({
        model: 'text-davinci-003', // Puedes usar el modelo más adecuado
        prompt: userMessage,
        max_tokens: 150
      });
      responseText = response.choices[0].text.trim();
    } catch (error) {
      console.error('Error al consultar OpenAI:', error);
      responseText = "Sorry, there was an error processing your request.";
    }
  }

  res.json({ response: responseText });
});

module.exports = router;
