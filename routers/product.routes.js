const express = require("express");
const multer = require("multer");
const ProductValidation = require("../middlewares/validation/product.validation");
const path = require("path");
const fs = require("fs");
const addProductController = require("../controllers/addProduct.controller");
const exportProductController = require("../controllers/exportProduct.controller");
const createProduct = require("../controllers/product.controller");
const barcodeController = require("../controllers/product/barocde.controller");
const deleteProductController = require("../controllers/product/deleteProduct.cotnroller");
const { permissionValidator } = require("../middlewares/permission-middleware");
const { ProductBarcodesController } = require("../controllers/product-barcodes.controller");
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const rootDir = path.dirname(require.main.filename);
    console.log(rootDir)
    fs.mkdirSync(path.join(rootDir, "/views/assets/uploads"), { recursive: true });
    cb(null, path.join(rootDir, "/views/assets/uploads"));
  },
  filename: (req, file, cb) => {
    let { ProductName} = JSON.parse(JSON.stringify(req.body));
    console.log(parseFloat(JSON.parse(req.body.QRcode)));
    const QRcode= parseFloat(JSON.parse(req.body.QRcode)[0])
    const extList = file.originalname.split(".");
    const extension = extList[extList.length - 1];
    const uniqueSuffix = ProductName + "_" + QRcode;
    let url = `${uniqueSuffix}.${extension}`;
    cb(null, url);
  },
});
const uploads = multer({ storage: storage });

router.post(
  "/createProduct",
  [
    (req, res, next) => {
      if (!req.files || !req.files.length) {
        return next();
      }
    },
    uploads.array("files", 5),
    ProductValidation.addProduct,
    permissionValidator
  ],
  createProduct
);

router.put("/changeBarcode",barcodeController)
router.get("/products/product-barcodes",ProductBarcodesController)
router.post("/addProduct",permissionValidator,addProductController);
router.post("/exportProduct",permissionValidator,exportProductController)
router.delete("/deleteProduct",permissionValidator,deleteProductController);
module.exports = router;