require('dotenv').config();
const env = process.env;
const express = require('express');
const db = require('./services/oracle-db');

// Configuration
const SERVER_PORT = env.SERVER_PORT;
const SERVER_HOST = env.SERVER_HOST;

// Create an Express application

const app = express();

async function startServer() {
  // Initialize Oracle Database

  if (!(await db.initialize())) {
    console.error('Failed to connect to Oracle Database, Exiting ...')
    return
  }

  // Launch Mosquitto Service

  require('./services/mosquitto')

  // Define a simple route for testing

app.get('/', (req, res) => {
  res.send('Hello, Clinic IoT Backend is running!');
});

  // Import and use routers
  // TODO: Uncomment and implement the routers for routers, devices, and records
  // const routersRouter = require('./routes/routers');
  // const devicesRouter = require('./routes/devices');
  // const recordsRouter = require('./routes/records');

  // app.use('/routers', routersRouter);
  // app.use('/devices', devicesRouter);
  // app.use('/records', recordsRouter);

  // Start the server

  app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server is running on ${SERVER_HOST}:${SERVER_PORT}`);
  });
}

startServer();

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await db.closePool();
  process.exit(0);
});