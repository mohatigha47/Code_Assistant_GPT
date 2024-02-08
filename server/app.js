// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Define a route for the homepage
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// Define a route for the about page
app.get('/about', (req, res) => {
  res.send('About Us');
});

// Define a route with dynamic parameters
app.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  res.send(`User ID: ${userId}`);
});

// Define a route for handling POST requests
app.post('/submit', (req, res) => {
  res.send('Form submitted successfully!');
});

// Start the server and listen on the specified port
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
