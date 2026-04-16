const { supabase } = require('../services/supabase');

async function getHourlyRecordsCount(req, res) {
    try {
        const { data, error } = await supabase
            .from('hourly_records')
            .select('*');
        if (error) {
            throw error;
        }
        res.json({ records_hourly: data })
    } catch (error) {
        console.error('Get hourly records error: ', error)
        res.status(500).json({ error: 'Failed to get hourly records' })
    }
}

async function getHourlyDevicesCount(req, res) {
    try {
        const { data, error } = await supabase
            .from('hourly_devices')
            .select('*');
        if (error) {
            throw error;
        }
        res.json({ records_hourly: data })
    } catch (error) {
        console.error('Get hourly devices error: ', error)
        res.status(500).json({ error: 'Failed to get hourly devices' })
    }
}

async function getRouterHourlyTotalSessionsDuration(req, res) {
    try {
        const { data, error } = await supabase
            .from('devices_hourly_sessions')
            .select('*');
        if (error) {
            throw error;
        }
        res.json({ hourly_sessions: data })
    } catch (error) {
        console.error('Get router hourly total sessions duration error: ', error)
        res.status(500).json({ error: 'Failed to get router hourly total sessions duration' })
    }
}

module.exports = {
    getHourlyRecordsCount,
    getHourlyDevicesCount,
    getRouterHourlyTotalSessionsDuration,
}