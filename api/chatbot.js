const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai'); // Asegúrate de que este paquete esté instalado

// Instancia de OpenAI usando la clave de entorno almacenada en Vercel
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Asegúrate de haber configurado esta variable en Vercel
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
  const userMessage = req.body.message.toLowerCase();
  let responseText;

  // Verifica si hay una respuesta personalizada
  if (customResponses[userMessage]) {
    responseText = customResponses[userMessage];
  } else {
    // Consulta a la API de OpenAI si no hay una respuesta personalizada
    try {
      const response = await openai.completions.create({
        model: 'text-davinci-003', // O el modelo que prefieras
        prompt: userMessage,
        max_tokens: 150
      });
      responseText = response.choices[0].text.trim();
    } catch (error) {
      console.error("Error calling OpenAI API:", error.message);
      responseText = "Sorry, there was an error processing your request.";
    }
  }

  // Respuesta en formato JSON que incluye tanto el mensaje del usuario como la respuesta del bot
  res.json({
    userMessage: req.body.message,  // Mensaje original del usuario
    botResponse: responseText       // Respuesta generada por el bot
  });
});

module.exports = router;
