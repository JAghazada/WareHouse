const addBasketController = require("../controllers/addBasket.controller");

const router = require("express").Router();
router.post("/addBasket",addBasketController);
module.exports = router;