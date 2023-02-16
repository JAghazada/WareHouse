const login = async(req, res) => {
    res.send({
        "msg": "you are in login page"
    })
    console.log(req.body);


}
const register = async(req, res) => {
    res.send({
        "msg": "you are in register  page"
    })
    console.log(req.body)
}
module.exports = {
    login,
    register
}