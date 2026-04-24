const { supabase } = require('../services/supabase');

async function getAllDevices(req, res) {
    try {
        const { data, error } = await supabase
            .from('devices_routers')
            .select('*');
        if (error) {
            throw error;
        }
        res.json({ devices: data })
    } catch (error) {
        console.error('Get all devices error: ', error)
        res.status(500).json({ error: 'Failed to get devices' })
    }
}

async function getAllDevicesWithRoutersInfo(req, res) {
    // TODO
}

async function insertDevice(req, res) {
    // TODO
}


module.exports = {
    getAllDevices,
    getAllDevicesWithRoutersInfo,
    insertDevice,
}