const selectHospitalId = `
    SELECT hospital_id FROM hospitals WHERE hospital_id = :hospital_id
`;

const selectHospitalByHospitalId = `
    SELECT id, hospital_id, password
    FROM hospitals WHERE hospital_id = :hospital_id
`;

const selectHospital = `
    SELECT id, name, hospital_id, admin_name, admin_email, blueprint
    FROM hospitals WHERE id = :id
`;

const insertHospital = `
    INSERT INTO hospitals (name, address, hospital_id, admin_name, admin_email, password)
    VALUES (:name, :address, :hospital_id, :admin_name, :admin_email, :password)
    RETURNING id INTO :id
    `;

const updateHospital = `
    UPDATE hospitals
    SET name = :name, address = :address, hospital_id = :hospital_id, admin_name = :admin_name, admin_email = :admin_email, password = :password
    WHERE id = :id
`;

const updateHospitalBlueprint = `
    UPDATE hospitals
    SET blueprint = :blueprint
    WHERE id = :id
`;

const deleteHospital = `
    DELETE FROM hospitals WHERE id = :id
`;

module.exports = {
    selectHospitalId,
    selectHospitalByHospitalId,
    selectHospital,
    insertHospital,
    updateHospital,
    updateHospitalBlueprint,
    deleteHospital,
};