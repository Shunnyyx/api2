const fs = require('fs');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

// Configura OpenAI API
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

  // Lee el archivo JSON con las respuestas
  fs.readFile(responsesPath, 'utf-8', async (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading chatbot data file' });
    }

    try {
      const responsesData = JSON.parse(data);

      // Detecta el idioma del mensaje del usuario
      const detectedLanguage = detectLanguage(message); // Usa una biblioteca para detectar el idioma
      const language = responsesData.responses[detectedLanguage] ? detectedLanguage : 'en';
      
      // Verifica el contenido del mensaje para devolver una respuesta adecuada
      let responseMessage;

      if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        responseMessage = responsesData.responses[language].greeting;
      } else if (message.toLowerCase().includes('bye') || message.toLowerCase().includes('goodbye')) {
        responseMessage = responsesData.responses[language].farewell;
      } else {
        // Usa la API de OpenAI para generar una respuesta
        const completion = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        });

        responseMessage = completion.data.choices[0].message.content.trim();

        // Si la respuesta generada por la IA no es adecuada, usa el mensaje predeterminado
        if (responseMessage.toLowerCase().includes('sorry') || responseMessage.toLowerCase().includes('couldn\'t understand')) {
          responseMessage = responsesData.responses[language].default;
        }
      }

      // Envía la respuesta del chatbot
      res.json({ response: responseMessage });

    } catch (parseError) {
      return res.status(500).json({ error: 'Error parsing chatbot data file' });
    }
  });
};
