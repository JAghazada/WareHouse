const { login, register, me } = require("../controllers/auth.controller")
const {requireLogin, redirectLoggedUser} = require("../middlewares/auth/requireLogin")
const { tokenCheck } = require("../middlewares/token/auth")
const AuthValidation = require("../middlewares/validation/auth.validation")
const router = require("express").Router()
router.get("/",redirectLoggedUser,(req,res)=>{
    res.render("login")
})
router.get("/login",(req,res)=>{
    res.render("login");
});
router.get("/register",(req,res)=>{
    res.render("register");
});
router.post("/login",AuthValidation.login, login)
router.post("/register", AuthValidation.register, register)
router.post("/me",tokenCheck,me)
module.exports = router


