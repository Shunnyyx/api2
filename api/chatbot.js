const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

// Instancia de OpenAI utilizando la clave API de las variables de entorno
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Configura esta variable en Vercel
});

// Diccionario de respuestas personalizadas
const customResponses = {
  "what is your name": "I'm Aiko, created by Aiko™. How can I assist you today?",
  "how are you": "I'm just a bot, but I'm here to help you!",
  "what can you do": "I can answer questions and provide information. Just ask me anything!",
  "default": "Sorry, I don't understand that question."
};

// Endpoint para recibir mensajes del usuario
router.post('/', async (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  let responseText;

  // Verifica si hay una respuesta personalizada
  if (customResponses[userMessage]) {
    responseText = customResponses[userMessage];
  } else {
    // Si no hay respuesta personalizada, llama a OpenAI
    try {
      const response = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: userMessage,
        max_tokens: 150
      });
      responseText = response.choices[0].text.trim();
    } catch (error) {
      responseText = "Sorry, there was an error processing your request.";
    }
  }

  // Devuelve la respuesta en formato JSON
  res.json({
    userMessage: req.body.message,
    botResponse: responseText
  });
});

module.exports = router;
