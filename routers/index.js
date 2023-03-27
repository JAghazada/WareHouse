const router = require("express").Router()
const auth = require("./auth.routes");
const admin = require("./admin.routes");
const product = require("./product.routes");
const listProduct = require("./listproducts.routes")
const productInfo = require("./productInfo.routes")
const increaseProduct = require("./IDcreaseProduct.routes");
const bill = require("./bill.routes");
const BasketRoute = require("./basket.routes");


router.use(bill)
router.use(BasketRoute)
router.use(increaseProduct)
router.use(productInfo)
router.use(product);
router.use(listProduct)
router.use(admin);
router.use(auth);


module.exports = router;
