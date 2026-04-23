const selectPatients = `
    SELECT * FROM patients WHERE hospital_id = :hospital_id
`;

const selectPatientById = `
    SELECT * FROM patients
    WHERE id = :patient_id
    AND hospital_id = :hospital_id
`;


const selectPatientRoutersSessions = `
    SELECT * FROM patients_routers_sessions
    WHERE patient_id = :patient_id
    ORDER BY start_time ASC
`;

const insertPatient = `
    INSERT INTO patients (id, hospital_id, name)
    VALUES (:patient_id, :hospital_id, :name)
`;

module.exports = {
    selectPatients,
    selectPatientById,
    selectPatientRoutersSessions,
    insertPatient
};