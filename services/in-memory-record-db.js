require('dotenv').config();
const queries = require('../controllers/queries/records');
const db = require('../services/oracle-db');
const { uuidToBuffer } = require('../controllers/converters/converters');
const oracledb = require('oracledb');
const uuid = require('uuid');

const env = process.env;

const MEMORY_RECORD_DB_FLUSH_PERIOD = env.MEMORY_RECORD_DB_FLUSH_PERIOD || 1000;

class InMemoryRecordDB {

    constructor() {
        this.map = new Map();
        this.insertArray = [];
        this.updateArray = [];
        this.flushing = false;
        // this.flushInterval = setInterval(() => this.flush(), MEMORY_RECORD_DB_FLUSH_PERIOD);
    }

    selectLatest2Records(device_id) {
        const data = this.map.get(device_id);
        if (data) {
            return { rows: data.slice(-2).reverse() };
        }
        return { rows: [] };
    }

    insert(data) {
        const { device_id, router_id, rssi } = data;
        const record = { device_id, router_id, rssi, timestamp: new Date() };
        const existingData = this.map.get(device_id) || [];
        existingData.push(record);
        this.map.set(device_id, existingData);
        this.insertArray.push(record);
    }

    updateLastRecord(data) {
        const { device_id, router_id, rssi } = data;
        const existingData = this.map.get(device_id) || [];
        const lastRecord = existingData[existingData.length - 1];
        if (lastRecord) {
            lastRecord.router_id = router_id;
            lastRecord.rssi = rssi;
            lastRecord.timestamp = new Date();

            if (lastRecord.id) {
                this.updateArray.push(lastRecord);
            }
        }
    }

    async flush() {
        if (this.flushing) return;
        this.flushing = true;

        if (this.insertArray.length) {
            console.log(`Flushing ${this.insertArray.length} records`);

            const insertArray = this.insertArray;
            this.insertArray = [];

            // update records with ids
            for (const record of insertArray) {
                record.id = uuid.v4();
            }

            // convert uuids to buffers
            const insertArrayWithBuffers = insertArray.map(record => ({
                record_id: uuidToBuffer(record.id),
                device_id: uuidToBuffer(record.device_id),
                router_id: uuidToBuffer(record.router_id),
                rssi: record.rssi,
            }))


            // insert db
            const { error: insertError } = await db.executeMany(queries.insertRecord, insertArrayWithBuffers, { autoCommit: true });

            if (insertError) {
                console.error(insertError);
            }


            // reduce map size
            for (const record of insertArray) {
                const existingData = this.map.get(record.device_id) || [];
                this.map.set(record.device_id, existingData.slice(-2));
            }
        }
        if (this.updateArray.length) {
            console.log(`Flushing ${this.updateArray.length} records`);

            const updateArray = this.updateArray;
            this.updateArray = [];

            // convert uuids to buffers
            const updateArrayWithBuffers = updateArray.map(record => ({
                record_id: uuidToBuffer(record.id),
                router_id: uuidToBuffer(record.router_id),
                rssi: record.rssi,
            }))


            // update db
            const { error: updateError } = await db.executeMany(queries.updateRecord, updateArrayWithBuffers, { autoCommit: true });

            if (updateError) {
                console.error(updateError);
            }
        }

        this.flushing = false;
    }

    async close() {
        clearInterval(this.flushInterval);
        await this.flush();
    }

}

module.exports = InMemoryRecordDB;