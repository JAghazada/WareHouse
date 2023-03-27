const IDcreaseProductController = require("../controllers/IDcreaseProduct.controller");


const Router =require("express").Router();
Router.post("/increaseProduct",IDcreaseProductController);

module.exports = Router