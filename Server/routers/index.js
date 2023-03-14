const router = require("express").Router()
const auth = require("./auth.routes");
const admin = require("./admin.routes");
const page = require("./page.routes");
const product = require("./product.routes");
const listProduct = require("./listproducts.routes")
const testController = require("./test.routes")
const productInfo = require("./productInfo.routes")
const increaseProduct = require("./IDcreaseProduct.routes");
const bill = require("./bill.routes");
router.use(bill)
router.use(increaseProduct)
router.use(testController);
router.use(productInfo)
router.use(product);
router.use(listProduct)
router.use(page);
router.use(admin);
router.use(auth);

module.exports = router;
