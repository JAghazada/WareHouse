const userController = require("../controllers/user.controllers");

const router = require("express").Router();



router.put("/change-user-permission",userController);



module.exports = router