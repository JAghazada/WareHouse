const { login, register, logout } = require("../controllers/auth.controller")
const { checkToken } = require("../helpers/auth/checkToken")
const AuthValidation = require("../middlewares/validation/auth.validation")
const router = require("express").Router()
router.get("/", (req, res) => {
    res.redirect("login")
})
router.get("/login", checkToken, (req, res) => {
    res.render("login");
});
router.get("/register", checkToken, (req, res) => {
    res.render("register");
});
router.get("/logout", logout);
router.post("/login", AuthValidation.login, login)
router.post("/register", AuthValidation.register, register)
// router.post("/me",tokenCheck,me)
module.exports = router


