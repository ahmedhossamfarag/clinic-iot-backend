/**
 * This script used to query the database
 * Usage: node database-query.js
 */
require('dotenv').config();
const db = require("./services/oracle-db");
const { arrToBuffer, uuidToBuffer } = require("./controllers/converters/converters");




const query = `
    SELECT * FROM HOSPITALS
`

async function executeQuery() {
    try {
        console.log('Connecting to database...');
        await db.initialize();
        console.log('Database connected successfully.');
        const {rowsAffected, rows, error} = await db.query(query, [], { autoCommit: true });
        if (error) {
            console.error('Error seeding database:', error);
        }
        if (rowsAffected) {
            console.log(`Rows affected: ${rowsAffected}`);
        }
        if (rows) {
            console.log(`Rows: ${rows.length}`);
            for (const row of rows) {
                console.log(JSON.stringify(row, null, 2));
            }
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await db.closePool();
        process.exit(0);
    }
}

executeQuery();
