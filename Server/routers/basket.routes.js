const addBasketController = require("../controllers/addBasket.controller");
const getBasketProducts = require("../controllers/getBasket.controller");

const router = require("express").Router();
router.post("/addBasket",addBasketController);
router.get("/getBasketProducts",getBasketProducts)
module.exports = router;