const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Route to send a request to the ChatGPT API
app.get('/chat', async (req, res) => {
  try {
    // Get the prompt from the query parameters
    const prompt = req.query.prompt;

    // Make a POST request to the ChatGPT API
    const response = await axios.post('https://api.openai.com/v1/completions', {
      prompt: prompt,
      max_tokens: 50, // Adjust max_tokens as needed
      temperature: 0.7, // Adjust temperature as needed
      model: 'text-davinci-003', // Adjust the model as needed
      engine: 'davinci',
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY', // Replace with your OpenAI API key
      }
    });

    // Send the response from the ChatGPT API back to the client
    res.json(response.data);
  } catch (error) {
    // Log the actual error message for debugging
    console.error('Error occurred:', error.response.data);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
