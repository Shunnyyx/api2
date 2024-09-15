const fs = require('fs');
const path = require('path');

// Path to the chatbot JSON file
const chatbotJsonPath = path.join(__dirname, '../data/chatbot.json');

// Load the chatbot data from the JSON file
const loadChatbotData = () => {
  try {
    const data = fs.readFileSync(chatbotJsonPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading the chatbot JSON file:', error);
    return null;
  }
};

// Function to handle messages
const handleMessage = (message) => {
  const chatbotData = loadChatbotData();
  if (!chatbotData) {
    return 'There was an issue loading the chatbot information.';
  }

  const responses = chatbotData.responses;

  if (message.toLowerCase().includes('hello')) {
    return responses.greeting;
  } else if (message.toLowerCase().includes('goodbye')) {
    return responses.farewell;
  } else {
    return responses.default;
  }
};

// Example usage
const userMessage = 'Hello, how are you?'; // You can change this to test different messages
console.log('Response:', handleMessage(userMessage));
