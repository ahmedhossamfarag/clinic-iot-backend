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

const insertRouter = `
    INSERT INTO routers (id, hospital_id, name, location_x, location_y)
    VALUES (:router_id, :hospital_id, :name, :location_x, :location_y)
`;



module.exports = {
    selectRoutersMap,
    selectRoutersHourlySessions,
    selectRouterById,
    selectRouterByName,
    insertRouter
};