const { Router } = require("express");
const { getAllDevices } = require("../controllers/devices");

const router = new Router();

router.get("/", getAllDevices);

module.exports = router;
