require('dotenv').config();
const env = process.env;
const express = require('express');

// Configuration
const SERVER_PORT = env.SERVER_PORT;
const SERVER_HOST = env.SERVER_HOST;

// Create an Express application

const app = express();

// Launch Mosquitto Service

require('./services/mosquitto')

// Define a simple route for testing

app.get('/', (req, res) => {
  res.send('Hello, Clinic IoT Backend is running!');
});

// Import and use routers

const routersRouter = require('./routes/routers');
const devicesRouter = require('./routes/devices');
const recordsRouter = require('./routes/records');

app.use('/routers', routersRouter);
app.use('/devices', devicesRouter);
app.use('/records', recordsRouter);

// Start the server

app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Server is running on ${SERVER_HOST}:${SERVER_PORT}`);
});