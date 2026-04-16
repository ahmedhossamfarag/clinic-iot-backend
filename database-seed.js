/*
* Database seeding script for populating the database with initial data.
* This script can be run using Node.js to insert sample data into the database.
* Usage: node database-seed.js
*/

const { supabase } = require('./services/supabase');

async function seedRouters() {
    console.log('Seeding routers...');
    // Clear existing data
    await supabase.from('routers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    // Seed new data
    const nRouters = 3;
    const routersIds = [];
    for (let i = 0; i < nRouters; i++) {
        const routerData = {
            name: `Seed Router ${i + 1}`,
            location_x: Math.random(),
            location_y: Math.random(),
        };
        const { data, error } = await supabase.from('routers').insert(routerData).select();
        if (!error) {
            routersIds.push(data[0].id);
        }
    }
    console.log('Routers seeded successfully: ', routersIds.length);
    return routersIds;
}

async function seedDevices() {
    console.log('Seeding devices...');
    // Clear existing data
    await supabase.from('devices').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    // Seed new data
    const nDevices = 20;
    const devicesIds = [];
    for (let i = 0; i < nDevices; i++) {
        const deviceData = {
            name: `Seed Device ${i + 1}`,
            holder_name: `Holder ${i + 1}`,
        }
        const { data, error } = await supabase.from('devices').insert(deviceData).select();
        if (!error) {
            devicesIds.push(data[0].id);
        }
    }
    console.log('Devices seeded successfully: ', devicesIds.length);
    return devicesIds;
}

async function seedDeviceRecords(routersIds, deviceId) {
    console.log(`Seeding records for device ${deviceId}...`);
    const nRecordsPerRouter = 3;
    const timestamp = new Date();
    timestamp.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0);
    for (const routerId of routersIds) {
        for (let i = 0; i < nRecordsPerRouter; i++) {
            const recordData = {
                router_id: routerId,
                device_id: deviceId,
                timestamp: timestamp,
            };
            const { error } = await supabase.from('records').insert(recordData);
            timestamp.setMinutes(timestamp.getMinutes() + Math.ceil(Math.random() * 30));
        }
    }
}
async function seedRecords(routersIds, devicesIds) {
    console.log('Seeding records...');
    // Clear existing data
    await supabase.from('records').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    // Seed new data
    for (const deviceId of devicesIds) {
        await seedDeviceRecords(routersIds, deviceId);
    }
    console.log('Records seeded successfully.');
}

async function seedDatabase() {
    try {
        console.log('Starting database seeding...');
        const routersIds = await seedRouters();
        const devicesIds = await seedDevices();
        await seedRecords(routersIds, devicesIds);
        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase();
