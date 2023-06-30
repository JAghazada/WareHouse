const adminController = require("../controllers/admin.controller");

const Router =require("express").Router();




Router.get("/admin",adminController);


module.exports = Router