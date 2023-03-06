const router = require("express").Router()
const auth = require("./auth.routes");
const admin = require("./admin.routes");
const page = require("./page.routes");
const product = require("./product.routes");
const listProduct = require("./listproducts.routes")
const testController = require("./test.routes")
router.use(testController);
router.use(product);
router.use(listProduct)
router.use(page);
router.use(admin);
router.use(auth);

module.exports = router;
