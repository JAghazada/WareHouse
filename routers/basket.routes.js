// !router
const router = require("express").Router();

// ?controllers
const addBasketController = require("../controllers/cart/addBasket.controller");
const clearBasketController = require("../controllers/cart/clearBasket.controller");
const deleteFromBasket = require("../controllers/cart/deleteFromBasket.controller");
const getBasketProducts = require("../controllers/cart/getBasket.controller");
const updateBasketProductController = require("../controllers/cart/updateBasketProduct.controller");

// ?routes
router.post("/addBasket",addBasketController);
router.post("/deleteFromBasket",deleteFromBasket);
router.get("/getBasketProducts",getBasketProducts);
router.put("/updateBasketProductCount",updateBasketProductController);
router.delete("/clearBasket",clearBasketController)
// *export
module.exports = router;