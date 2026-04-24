const selectDevices = `
    SELECT * FROM devices
    WHERE hospital_id = :hospital_id
`;

const selectDevicesRouters = `
    SELECT * FROM devices_routers
    WHERE hospital_id = :hospital_id
`;

const selectDeviceById = `
    SELECT * FROM devices
    WHERE id = :device_id
    AND hospital_id = :hospital_id
`;

const selectDeviceByName = `
    SELECT * FROM devices
    WHERE name = :name
    AND hospital_id = :hospital_id
`;

const insertDevice = `
    INSERT INTO devices (id, hospital_id, name)
    VALUES (:device_id, :hospital_id, :name)
`;

const updateDeviceHolder = `
    UPDATE devices
    SET patient_id = :patient_id
    WHERE id = :device_id
    AND hospital_id = :hospital_id
`;

const deleteDevices = `
    DELETE FROM devices
    WHERE hospital_id = :hospital_id
`;


module.exports = {
    selectDevices,
    selectDevicesRouters,
    selectDeviceById,
    selectDeviceByName,
    insertDevice,
    updateDeviceHolder,
    deleteDevices
};