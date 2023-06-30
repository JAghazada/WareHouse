const userSchema = require("../database/models/userSchema");

const adminController = async(req, res) => {
    const users = await userSchema.find({});
   res.render("admin",{users});
}
module.exports = adminController