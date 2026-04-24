const { supabase } = require('../services/supabase')

async function getAllRouters(req, res) {
    try {
        const { data, error } = await supabase
            .from('routers')
            .select('*');
        if (error) {
            throw error;
        }
        res.json({ routers: data })
    } catch (error) {
        console.error('Get all routers error: ', error)
        res.status(500).json({ error: 'Failed to get routers' })
    }
}

async function getRoutersMap(req, res) {
    try {
        const { data, error } = await supabase
            .from('routers_map')
            .select('*');
        if (error) {
            throw error;
        }
        res.json({ routers_map: data })
    } catch (error) {
        console.error('Get routers map error: ', error)
        res.status(500).json({ error: 'Failed to get routers map' })
    }
}

async function getRouterById(req, res) {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('routers')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            throw error;
        }
        res.json({ router: data })
    } catch (error) {
        console.error('Get router by ID error: ', error)
        res.status(500).json({ error: 'Failed to get router' })
    }
}

async function getRouterConnectedDevices(req, res) {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('devices_routers')
            .select('*')
            .eq('router_id', id);
        if (error) {
            throw error;
        }
        res.json({ devices: data })
    } catch (error) {
        console.error('Get router connected devices error: ', error)
        res.status(500).json({ error: 'Failed to get router connected devices' })
    }
}

async function getRouterHourlySessionsDuration(req, res) {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('routers_hourly_sessions')
            .select('*')
            .eq('router_id', id);
        if (error) {
            throw error;
        }
        res.json({ hourly_sessions: data })
    } catch (error) {
        console.error('Get router hourly sessions error: ', error)
        res.status(500).json({ error: 'Failed to get router hourly sessions' })
    }
}

async function insertRouter(req, res) {
    // TODO
}

module.exports = {
    getAllRouters,
    getRoutersMap,
    getRouterById,
    getRouterConnectedDevices,
    getRouterHourlySessionsDuration,
    insertRouter,
}