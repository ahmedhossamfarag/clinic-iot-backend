const { supabase } = require('../services/supabase');

async function getAllDevices(req, res) {
    try {
        const { data, error } = await supabase
            .from('devices')
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

module.exports = {
    getAllDevices,
}