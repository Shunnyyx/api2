const fs = require('fs');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

// Configuración de OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const responsesPath = path.join(__dirname, '../data/chatbot.json');

module.exports = async (req, res) => {
  const { message } = req.query;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  // Lee el archivo JSON con las respuestas predefinidas
  fs.readFile(responsesPath, 'utf-8', async (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading chatbot data file' });
    }

    try {
      const responsesData = JSON.parse(data);

      // Verifica el contenido del mensaje para devolver una respuesta adecuada
      let responseMessage;

      if (message.toLowerCase().includes('name') || message.toLowerCase().includes('who are you')) {
        responseMessage = "I am Aiko AI.";
      } else if (message.toLowerCase().includes('creator') || message.toLowerCase().includes('who created you')) {
        responseMessage = "I was created by Aiko™.";
      } else {
        // Usa la API de OpenAI para generar una respuesta
        const completion = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        });

        responseMessage = completion.data.choices[0].message.content.trim();

        // Si la respuesta generada por la IA no es adecuada, usa el mensaje predeterminado
        if (responseMessage.toLowerCase().includes('sorry') || responseMessage.toLowerCase().includes('couldn\'t understand')) {
          responseMessage = responsesData.responses['en'].default; // Ajusta el idioma si es necesario
        }
      }

      // Envía la respuesta del chatbot
      res.json({ response: responseMessage });

    } catch (parseError) {
      return res.status(500).json({ error: 'Error parsing chatbot data file' });
    }
  });
};
