const env = process.env;
const mqtt = require('mqtt');
const { validate } = require('uuid');
const InMemoryRecordDB = require('./in-memory-record-db');


// Configuration

const MQTT_BROKER = env.MQTT_BROKER;
const MQTT_PORT = env.MQTT_PORT;
const MQTT_TOPIC = env.MQTT_TOPIC;
const MQTT_USERNAME = env.MQTT_USERNAME;
const MQTT_PASSWORD = env.MQTT_PASSWORD;
const DEVICES_SIGNAL_PERIOD = env.DEVICES_SIGNAL_PERIOD;

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

const inMemoryRecordDB = new InMemoryRecordDB();


client.on('message', onMQTTMessage);


async function onMQTTMessage(topic, message) {
  if (topic === MQTT_TOPIC) {
    try {
      const data = JSON.parse(message.toString());
      if (data && validate(data.router_id) && validate(data.device_id) && typeof data.rssi === 'number') {
        const router_id = data.router_id;
        const device_id = data.device_id;
        const rssi = data.rssi;
        console.log('Received MQTT message:', { router_id, device_id, rssi });
        const { error, rows } = inMemoryRecordDB.selectLatest2Records(device_id);
        if (!error)
          if (!rows.length) {
            // The device has no records yet. Insert a new record
            inMemoryRecordDB.insert({ router_id, device_id, rssi });
            console.log('Inserted new record');
          } else {
            // The device has records.
            const timestamp = rows[0].timestamp;
            const now = new Date();
            if (now - timestamp < DEVICES_SIGNAL_PERIOD * 1000) {
              // This is a duplicate signal
              if (router_id !== rows[0].router_id && rows[0].rssi < rssi){
                // Assign the record to the the router with the highest RSSI
                inMemoryRecordDB.updateLastRecord({ router_id, rssi, device_id });
                console.log('Updated record with new Router ID and RSSI');
              }
            } else {
              // This is a new signal
              if (rows.length >= 2 && router_id === rows[0].router_id && router_id === rows[1].router_id) {
                // The device has at least two consecutive records from the current router.
                inMemoryRecordDB.updateLastRecord({ device_id, router_id, rssi });
                console.log('Updated record with new RSSI');
              } else {
                // The device has only one record from the current router.
                inMemoryRecordDB.insert({ router_id, device_id, rssi });
                console.log('Inserted new record');
              }
            }
          }
      }
    } catch (error) {
      console.error('Error processing MQTT message:', error);
    }
  }
}