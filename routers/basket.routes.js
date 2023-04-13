// !router
const router = require("express").Router();

// ?controllers
const addBasketController = require("../controllers/cart/addBasket.controller");
const clearBasketController = require("../controllers/cart/clearBasket.controller");
const confirmOrderController = require("../controllers/cart/confirmOrder.controller");
const deleteFromBasket = require("../controllers/cart/deleteFromBasket.controller");
const getBasketProducts = require("../controllers/cart/getBasket.controller");
const showBasketController = require("../controllers/cart/showbasket.controller");
const updateBasketProductController = require("../controllers/cart/updateBasketProduct.controller");
const { requireLogin } = require("../middlewares/auth/requireLogin");

// ?routes
router.post("/confirmOrder",confirmOrderController)
router.post("/addBasket",addBasketController);
router.post("/deleteFromBasket",deleteFromBasket);
router.get("/getBasketProducts",getBasketProducts);
router.get("/basket",requireLogin,showBasketController)
router.put("/updateBasketProductCount",updateBasketProductController);
router.delete("/clearBasket",clearBasketController)
// *export
module.exports = router;