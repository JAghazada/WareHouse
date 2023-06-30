const confimOrderController = require("../controllers/confirmOrder.controller");
const orderPageController = require("../controllers/orderPage.controller");

const router = require("express").Router();

router.get("/orders",orderPageController);
router.get("/confirmOrder",confimOrderController)
module.exports = router