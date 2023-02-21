const router = require("express").Router()
const auth = require("./auth.routes");
const admin = require("./admin.routes");
const page = require("./page.routes");
const product = require("./product.routes");
const multer = require("multer");
const uploadFile = require("../middlewares/lib/upload/upload");
const Response = require("../utils/response");
// const uploadImage = require("./image.upload.routes")

// router.use(uploadImage)
router.use(product);
router.use(page);
router.use(admin);
router.use(auth);

module.exports = router;
