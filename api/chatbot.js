const fs = require('fs');
const path = require('path');
const { Configuration, OpenAI } = require('openai');

// Cargar la API Key de OpenAI desde las variables de entorno
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAI(configuration);

// Ruta al archivo JSON de respuestas del chatbot
const chatbotDataPath = path.join(__dirname, '../data/chatbot.json');

module.exports = async (req, res) => {
  // Lee el archivo JSON de respuestas
  fs.readFile(chatbotDataPath, 'utf-8', async (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading chatbot data file' });
    }

    try {
      const chatbotData = JSON.parse(data);
      const userMessage = req.body.message; // Mensaje del usuario
      const userLang = req.body.language || 'en'; // Idioma del usuario, por defecto 'en'

      // Respuestas predefinidas
      const responses = chatbotData.responses[userLang] || chatbotData.responses['en'];

      // Comprobar si el mensaje es una pregunta que tiene una respuesta predefinida
      if (userMessage.toLowerCase().includes('who are you') || userMessage.toLowerCase().includes('what is your name')) {
        return res.json({ response: responses.greeting });
      }
      if (userMessage.toLowerCase().includes('who created you') || userMessage.toLowerCase().includes('who is your creator')) {
        return res.json({ response: 'I am created by Aiko™' });
      }

      // Respuesta predeterminada si el mensaje no coincide con respuestas predefinidas
      const defaultResponse = responses.default;

      // Usar OpenAI para generar una respuesta
      try {
        const completion = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: userMessage,
          max_tokens: 150,
        });
        return res.json({ response: completion.data.choices[0].text.trim() || defaultResponse });
      } catch (openAIError) {
        return res.status(500).json({ error: 'Error generating response from OpenAI' });
      }
    } catch (parseError) {
      return res.status(500).json({ error: 'Error parsing chatbot data file' });
    }
  });
};
