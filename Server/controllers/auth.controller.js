const user = require("../database/models/userSchema")
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/token/auth");
const login = async(req, res) => {
    const {name,pass} = req.body
    const findUser = await user.findOne({name})
    if(!findUser){
        throw new APIError("Password or Email is worng",403)
    }
    const comparePassword = await bcrypt.compare(pass,findUser.pass)
    if(!comparePassword){
        throw new APIError("Password or Email is worng",403)
    }
    createToken(findUser,res)

}
const register = async(req, res) => {
    const { name, pass, repass, code } = req.body

    if (pass === repass) {
        const userInfo = {
            name,
            pass,
            isAdmin: code === 13 ? true : false
        }
        const checkUser = await user.findOne({ name });

        if (checkUser !== null) {
            throw new APIError("This name alreadey take", 403)
        }
        userInfo.pass = await bcrypt.hash(pass, 10)

        const saveUser = new user(userInfo)
        await saveUser.save()
            .then(resp => {
                return new Response(resp, "Registiration is successful").created(res)

            })
            .catch(err => {
                throw new APIError("Something went wrong at registiration time", 400)
            })

    } else {
        return res.send({
            msg: "Passwords is not same",
            status: 403
        })
    }


}
const me = async(req,res)=>{
    return new Response(req.user).success(res)
}
module.exports = {
    login,
    register,
    me
}