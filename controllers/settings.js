const bcrypt = require("bcrypt");
const authQueries = require("../controllers/queries/auth");
const patientQueries = require("../controllers/queries/patients");
const routerQueries = require("../controllers/queries/routers");
const deviceQueries = require("../controllers/queries/devices");
const db = require("../services/oracle-db");
const { arrToBuffer } = require("../controllers/converters/converters");


async function updateSettings(req, res) {
    try {
        const hospital_id = arrToBuffer(req.hospital.id.data);
        const { name, address, admin_name, admin_email, password } = req.body;
        // Get current hospital settings
        const currentSettingsResult = await db.query(authQueries.selectHospital, { id: hospital_id });
        if (currentSettingsResult.error || !currentSettingsResult.rows.length) {
            throw currentSettingsResult.error || new Error('Hospital not found');
        }
        const currentSettings = currentSettingsResult.rows[0];
        // Encrypt password if provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            password = hashedPassword;
        }
        // Create update object with new values or keep current values if not provided
        const updateData = {
            id: hospital_id,
            name: name || currentSettings.NAME,
            address: address || currentSettings.ADDRESS,
            admin_name: admin_name || currentSettings.ADMIN_NAME,
            admin_email: admin_email || currentSettings.ADMIN_EMAIL,
            password: password || currentSettings.PASSWORD,
        };
        // Update hospital settings
        const result = await db.query(authQueries.updateHospital, updateData, { autoCommit: true });
        if (result.error) {
            throw result.error;
        }
        res.status(200).json({ message: "Settings updated successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update settings' });
    }
}

async function updateBlueprint(req, res) {
    // TODO
}

async function resetRecords(req, res) {
    try{
        const hospital_id = arrToBuffer(req.hospital.id.data);
        const result = await db.query(patientQueries.deletePatients, { hospital_id }, { autoCommit: true });
        if (result.error) {
            throw result.error;
        }
        res.status(200).json({ message: "Patients reset successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reset records' })
    }
}

async function deleteAccount(req, res) {
    try {
        const hospital_id = arrToBuffer(req.hospital.id.data);
        const result = await db.query(routerQueries.deleteRouters, { hospital_id }, { autoCommit: true });
        if (result.error) {
            throw result.error;
        }
        const result2 = await db.query(deviceQueries.deleteDevices, { hospital_id }, { autoCommit: true });
        if (result2.error) {
            throw result2.error;
        }
        const result3 = await db.query(patientQueries.deletePatients, { hospital_id }, { autoCommit: true });
        if (result3.error) {
            throw result3.error;
        }
        const result4 = await db.query(authQueries.deleteHospital, { id: hospital_id }, { autoCommit: true });
        if (result4.error) {
            throw result4.error;
        }
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete account' })
    }
}

module.exports = {
    updateSettings,
    updateBlueprint,
    resetRecords,
    deleteAccount
};