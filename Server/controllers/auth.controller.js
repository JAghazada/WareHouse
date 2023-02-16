const user = require("../database/models/userSchema")
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const login = async(req, res) => {
    res.send({
        "msg": "you are in login page"
    })
    console.log(req.body);


}
const register = async(req, res) => {
    const { name, pass, repass, code } = req.body
    console.log(req.body)
    if (pass === repass) {
        const userInfo = {
            name,
            pass,
            isAdmin: code === 13 ? true : false
        }
        const checkUser = await user.findOne({ name });
        console.log(checkUser)
        if (checkUser !== null) {
            throw new APIError("This name alreadey take", 403)
        }
        userInfo.pass = await bcrypt.hash(pass, 10)
        try {
            const saveUser = new user(userInfo)
            return await saveUser.save()
                .then(resp => res.send({ msg: "Success" }))
                .catch(err => res.send({
                    msg: "Error Occured in saving user"
                }))
        } catch (error) {
            console.log(error)
        }
    } else {
        return res.send({
            msg: "Passwords is not same",
            status: 403
        })
    }


}
module.exports = {
    login,
    register
}