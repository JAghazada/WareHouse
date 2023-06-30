const { barcodeController } = require("../controllers/barcode.controller");

const Router = require("express").Router();



Router.get("/barcodes",barcodeController)

module.exports = Router