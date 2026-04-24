const { Router } = require("express");
const { updateSettings, updateBlueprint, resetRecords, deleteAccount} = require("../controllers/settings");

const router = new Router();

router.put("/", updateSettings);
router.put("/blueprint", updateBlueprint);
router.delete("/records", resetRecords);
router.delete("/account", deleteAccount);

module.exports = router;