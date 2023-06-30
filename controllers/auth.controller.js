const user = require("../database/models/userSchema")
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const jwt = require("jsonwebtoken")
const createToken = async(userID,userName,permission)=>{
    return await jwt.sign({
        userID,
        userName,
        permission
    },
    process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
};
const login = async(req, res) => {
    const {name,pass} = req.body
    const findUser = await user.findOne({name})
    if(!findUser){
        throw new APIError("Password or Email is wrong",403)
    }
    const comparePassword = await bcrypt.compare(pass,findUser.pass)
    if(!comparePassword){
        throw new APIError("Password or Email is wrong",403)
    }
    const token =await createToken(findUser._id,findUser.name,findUser.permission);
    res.cookie("auth",token,{
        httpOnly:true,
        maxAge:1000*60*60*24
    })
   res.status(201).json({
    link:"/products",
    message:"success",
    success:true
   })
};
const register = async(req, res) => {
    const { name, pass, repass ,phone} = req.body

    if (pass === repass) {
        const userInfo = {
            name,
            pass,
            phone,
            isAdmin: false,
            department:"Bazar",
            permission:0
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
const logout = (req,res)=>{
    res.clearCookie("auth");
    res.redirect("/login");

}
module.exports = {
    login,
    register,
    logout
}