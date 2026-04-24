const selectRouters = `
    SELECT * FROM routers
    WHERE hospital_id = :hospital_id
`;

const selectRoutersMap = `
    SELECT * FROM routers_map
    WHERE hospital_id = :hospital_id
`;

const selectRoutersHourlySessions = `
    SELECT * FROM routers_hourly_sessions
    WHERE router_id = :router_id
`;

const selectRouterById = `
    SELECT * FROM routers
    WHERE id = :router_id
    AND hospital_id = :hospital_id
`;

const selectRouterByName = `
    SELECT * FROM routers
    WHERE name = :name
    AND hospital_id = :hospital_id
`;

const selectRouterConnectedDevices = `
    SELECT * FROM devices_routers
    WHERE hospital_id = :hospital_id
    AND router_id = :router_id
`;


const insertRouter = `
    INSERT INTO routers (id, hospital_id, name, location_x, location_y)
    VALUES (:router_id, :hospital_id, :name, :location_x, :location_y)
`;

const deleteRouters = `
    DELETE FROM routers
    WHERE hospital_id = :hospital_id
`;


module.exports = {
    selectRouters,
    selectRoutersMap,
    selectRoutersHourlySessions,
    selectRouterById,
    selectRouterByName,
    selectRouterConnectedDevices,
    insertRouter,
    deleteRouters
};