const { Router } = require("express");
const {
    getHourlyRecordsCount,
    getHourlyDevicesCount,
    getRouterHourlyTotalSessionsDuration,
} = require("../controllers/records");

const router = new Router();

router.get("/hourly-records", getHourlyRecordsCount);
router.get("/hourly-devices", getHourlyDevicesCount);
router.get("/hourly-sessions-duration", getRouterHourlyTotalSessionsDuration);

module.exports = router;
