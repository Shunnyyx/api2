const fs = require('fs');
const path = require('path');
const axios = require('axios'); // Asegúrate de instalar axios usando 'npm install axios'

const openaiApiKey = process.env.OPENAI_API_KEY; // Tu API key de OpenAI
const openaiApiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions'; // URL de la API de OpenAI

module.exports = async (req, res) => {
  // Path to the chatbot JSON file
  const chatbotJsonPath = path.join(__dirname, '../data/chatbot.json');
  
  // Read the JSON file
  fs.readFile(chatbotJsonPath, 'utf-8', async (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading the chatbot data file' });
    }

    try {
      const chatbotData = JSON.parse(data);
      const responses = chatbotData.responses;

      if (!responses) {
        return res.status(404).json({ error: 'No responses found' });
      }

      // Get the message and language from the query parameters
      const message = req.query.message || '';
      const lang = req.query.lang || 'en'; // Default to English if no language is specified

      // Determine the response language
      const languageResponses = responses[lang] || responses['en']; // Fallback to English

      // Determine the response based on the message
      let responseMessage = languageResponses.default;

      // Handle specific cases
      if (/how\s*are\s*you/i.test(message)) {
        responseMessage = languageResponses.greeting;
      } else if (/goodbye|bye|see you/i.test(message)) {
        responseMessage = languageResponses.farewell;
      } else if (/what\s*is\s*your\s*name/i.test(message)) {
        responseMessage = 'My name is Aiko AI.';
      } else if (/who\s*created\s*you/i.test(message)) {
        responseMessage = 'I was created by Aiko™.';
      } else {
        // Query the OpenAI API for other cases
        try {
          const apiResponse = await axios.post(openaiApiUrl, {
            prompt: message,
            max_tokens: 150
          }, {
            headers: {
              'Authorization': `Bearer ${openaiApiKey}`,
              'Content-Type': 'application/json'
            }
          });

          responseMessage = apiResponse.data.choices[0].text.trim();
        } catch (apiError) {
          console.error('Error querying OpenAI:', apiError);
          responseMessage = languageResponses.default;
        }
      }

      // Respond with the determined message
      res.json({ response: responseMessage });

    } catch (parseError) {
      return res.status(500).json({ error: 'Error parsing the chatbot data file' });
    }
  });
};
