const selectHourlyRecords = `
    SELECT * FROM hourly_records
    WHERE hospital_id = :hospital_id
`;

const selectHourlyPatients = `
    SELECT * FROM hourly_patients
    WHERE hospital_id = :hospital_id
`;

const selectPatientsHourlySessions = `
    SELECT
        TRUNC (earliest_start_time, 'HH') AS hour,
        AVG (total_duration) AS average_total_session_duration
    FROM patients_sessions
    JOIN patients ON patients_sessions.patient_id = patients.id
    WHERE hospital_id = :hospital_id
    GROUP BY TRUNC (earliest_start_time, 'HH')
    ORDER BY TRUNC (earliest_start_time, 'HH')
`;

const insertRecord = `
    INSERT INTO records (router_id, patient_id, rssi)
    SELECT :router_id, patient_id, :rssi
    FROM devices
    WHERE device_id = :device_id
`;

module.exports = {
    selectHourlyRecords,
    selectHourlyPatients,
    selectPatientsHourlySessions,
    insertRecord
};