const router = require("express").Router()
const auth = require("./auth.routes");
const product = require("./product.routes");
const listProduct = require("./listproducts.routes")
const productInfo = require("./productInfo.routes")
const HomeRouter = require("./home.routes")
const BillRouter =require("./bill.routes")
const ConfirmOrderRouter = require("./order.routes");
const AdminRouter = require("./admin.routes");
const UserRouter = require("./user.routes");
const BarcodeRouter = require("./barcode.routes");
router.use(UserRouter);
router.use(BarcodeRouter);
router.use(productInfo);
router.use(product);
router.use(listProduct);
router.use(auth);
router.use(HomeRouter);
router.use(ConfirmOrderRouter);
router.use(BillRouter);
router.use(AdminRouter);

module.exports = router;
