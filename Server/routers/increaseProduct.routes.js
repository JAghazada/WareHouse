const increaseProductController = require("../controllers/increaseProduct.controller");

const Router =require("express").Router();
Router.post("/increaseProduct",increaseProductController);

module.exports = Router