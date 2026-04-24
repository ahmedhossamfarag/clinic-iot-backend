const { Router } = require("express");
const { getAllDevices, getAllDevicesWithRoutersInfo, insertDevice } = require("../controllers/devices");
const { validateDevice } = require("../controllers/validators/devices");

const router = new Router();

router.get("/", getAllDevices);
router.get("/with-routers-info", getAllDevicesWithRoutersInfo);
router.post("/", validateDevice, insertDevice);

module.exports = router;
