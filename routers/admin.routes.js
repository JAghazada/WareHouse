const admin = require("../controllers/admin.controller");

const router = require("express").Router();
router.post("/admin", admin)
module.exports = router