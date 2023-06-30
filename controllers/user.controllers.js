const userSchema = require("../database/models/userSchema");

const userController =async(req,res)=>{
    const {id,permission} = req.body;
    try {
        const user = await userSchema.findById(id);
        
        if (!user) {
          return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }
        
        user.permission = permission;
        await user.save();
        
        return res.json({ user });
      } catch (error) {
        return res.status(500).json({ message: "Sunucu hatası" });
      }

}
module.exports = userController