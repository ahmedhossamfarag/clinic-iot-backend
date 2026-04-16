require('dotenv').config();
const env = process.env;
const express = require('express');

// Configuration
const SERVER_PORT = env.SERVER_PORT;

// Create an Express application

const app = express();

// Launch Mosquitto Service

require('./services/mosquitto')

// Define a simple route for testing

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server

app.listen(SERVER_PORT, () => {
  console.log('Server is running on port 3000');
});