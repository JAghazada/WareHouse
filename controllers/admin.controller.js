const admin = async(req, res) => {
    res.send({
        "msg": "There is admmin page.",
        "server": "You can't access permission"
    })
}
module.exports = admin