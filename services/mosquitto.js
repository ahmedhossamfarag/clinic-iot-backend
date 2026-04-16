require('dotenv').config();
const env = process.env;
const mqtt = require('mqtt');

// Configuration

const MQTT_BROKER = env.MQTT_BROKER;
const MQTT_PORT = env.MQTT_PORT;
const MQTT_TOPIC = env.MQTT_TOPIC;
const MQTT_USERNAME = env.MQTT_USERNAME;
const MQTT_PASSWORD = env.MQTT_PASSWORD;

// Connect to the MQTT broker

const client = mqtt.connect(`${MQTT_BROKER}:${MQTT_PORT}`, {
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
});

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe(MQTT_TOPIC, (err) => {
    if (err) {
      console.error('Error subscribing to topic:', err);
    } else {
      console.log('Subscribed to topic:', MQTT_TOPIC);
    }
  });
});

// Handle incoming MQTT messages

client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
});
