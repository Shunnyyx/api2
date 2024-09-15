const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Path to the chatbot JSON file
  const chatbotJsonPath = path.join(__dirname, '../data/chatbot.json');
  
  // Read the JSON file
  fs.readFile(chatbotJsonPath, 'utf-8', (err, data) => {
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

      // Simple checks for different keywords
      if (/hello|hi|hey/i.test(message)) {
        responseMessage = languageResponses.greeting;
      } else if (/goodbye|bye|see you/i.test(message)) {
        responseMessage = languageResponses.farewell;
      }

      // Respond with the determined message
      res.json({ response: responseMessage });

    } catch (parseError) {
      return res.status(500).json({ error: 'Error parsing the chatbot data file' });
    }
  });
};
