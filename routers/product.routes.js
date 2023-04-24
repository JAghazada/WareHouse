const express = require("express");
const multer = require("multer");
const uploadProduct = require("../controllers/product.controller");
const ProductValidation = require("../middlewares/validation/product.validation");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const rootDir = path.dirname(require.main.filename);
    fs.mkdirSync(path.join(rootDir, "./views/assets/uploads"), { recursive: true });
    cb(null, path.join(rootDir, "./views/assets/uploads"));
  },
  filename: (req, file, cb) => {
    const { ProductName, QRcode } = JSON.parse(JSON.stringify(req.body));
    const extList = file.originalname.split(".");
    const extension = extList[extList.length - 1];
    const uniqueSuffix = ProductName + "_" + QRcode.split(",")[0];
    let url = `${uniqueSuffix}.${extension}`;
    cb(null, url);
  },
});
const uploads = multer({ storage: storage });

router.post(
  "/uploadProduct",
  [
    (req, res, next) => {
      if (!req.files || !req.files.length) {
        return next();
      }
      next();
    },
    uploads.array("files", 5),
    ProductValidation.addProduct,
  ],
  uploadProduct
);

module.exports = router