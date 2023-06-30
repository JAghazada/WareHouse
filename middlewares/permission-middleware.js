const userSchema  = require("../database/models/userSchema");
const jwt = require("jsonwebtoken");
const permissionValidator = async(req,res,next)=>{
    const {originalUrl} = req
    const userID = jwt.decode(req.cookies.auth).userID;
    const user = await userSchema.findById(userID);
    if(!user) {
       return res.json({
            message:"Sessiya bitib , giriş edin",
            success :false,
            error:"Sessiya bitib , giriş edin"
        })
    }
    const permisson = user.permission;
    if(originalUrl === "/addProduct"){
        if(permisson === 5 || permisson === 1 || permisson === 4){
            next()
        }else{
          return  res.json({
                error:"Icaze yoxdur",
                message:"Əməlliyata icazə yoxdur",
                success:false
            })
        }
    }
    else if(originalUrl === "/exportProduct"){
        if(permisson === 5 || permisson === 2 || permisson === 4){
            next()
        }else{
           return  res.json({
                error:"Icaze yoxdur",
                message:"Əməlliyata icazə yoxdur",
                success:false
            })
        }
    }
    else if(originalUrl === "/createProduct"){
        if(permisson === 5 || permisson === 3 || permisson === 4){
            next()
        }else{
           return  res.json({
                error:"Icaze yoxdur",
                message:"Əməlliyata icazə yoxdur",
                success:false
            })
        }
    }
    else if(originalUrl === "/deleteProduct"){
        if(permisson === 5){
            return next()
        }else{
           return  res.json({
                error:"Icaze yoxdur",
                message:"Əməlliyata icazə yoxdur",
                success:false
            })
        }
    }else{
        return  res.json({
            error:"Icaze yoxdur",
            message:"Əməlliyata icazə yoxdur",
            success:false
        })
    }
  
}
module.exports = {
    permissionValidator
}