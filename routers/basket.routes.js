const addBasketController = require("../controllers/addBasket.controller");
const deleteFromBasket = require("../controllers/deleteFromBasket.controller");
const getBasketProducts = require("../controllers/getBasket.controller");

const router = require("express").Router();
router.post("/addBasket",addBasketController);
router.post("/deleteFromBasket",deleteFromBasket)
router.get("/getBasketProducts",getBasketProducts)
module.exports = router;