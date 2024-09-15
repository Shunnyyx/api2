const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Path to the chatbot JSON file
const chatbotJsonPath = path.join(__dirname, 'data/chatbot.json');

// Load chatbot data
const loadChatbotData = () => {
  try {
    const data = fs.readFileSync(chatbotJsonPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading the chatbot JSON file:', error);
    return null;
  }
};

// Endpoint to get chatbot response
app.get('/api/chatbot', (req, res) => {
  const message = req.query.message; // Get message from query parameter
  const chatbotData = loadChatbotData();

  if (!chatbotData) {
    return res.status(500).json({ error: 'Error loading chatbot data' });
  }

  const responses = chatbotData.responses;

  let responseMessage = responses.default;

  if (message) {
    if (message.toLowerCase().includes('hello')) {
      responseMessage = responses.greeting;
    } else if (message.toLowerCase().includes('goodbye')) {
      responseMessage = responses.farewell;
    }
  }

  res.json({ response: responseMessage });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
