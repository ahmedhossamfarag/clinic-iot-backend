const { Router } = require("express");
const {
    getAllRouters,
    getRoutersMap,
    getRouterById,
    getRouterConnectedDevices,
    getRouterHourlySessionsDuration,
} = require("../controllers/routers");

const router = new Router();

router.get("/", getAllRouters);
router.get("/map", getRoutersMap);
router.get("/:id", getRouterById);
router.get("/:id/devices", getRouterConnectedDevices);
router.get("/:id/hourly-sessions-duration", getRouterHourlySessionsDuration);

module.exports = router;
