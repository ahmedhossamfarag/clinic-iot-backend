require('dotenv').config()
const env = process.env
const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = env.SUPABASE_URL;
const SUPABASE_PUB_KEY = env.SUPABASE_PUB_KEY;

if (!SUPABASE_URL || !SUPABASE_PUB_KEY) {
    console.error('Supabase configurations not provided');
    throw new Error('Supabase configurations not provided');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_PUB_KEY);

module.exports = { supabase }
