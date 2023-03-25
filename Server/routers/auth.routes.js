const { login, register, me } = require("../controllers/auth.controller")
const { tokenCheck } = require("../middlewares/token/auth")
const AuthValidation = require("../middlewares/validation/auth.validation")
const router = require("express").Router()
router.get("/",(req,res)=>{
    res.render("auth")
})
router.post("/login",AuthValidation.login, login)
router.post("/register", AuthValidation.register, register)
router.post("/me",tokenCheck,me)
module.exports = router


