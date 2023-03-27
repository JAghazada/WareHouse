const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const APIError = require("../../utils/errors");
const userSchema = require("../../database/models/userSchema");
dotenv.config()
const secretKey = process.env.JWT_SECRET_KEY
const createToken = async(user,res) =>{
    const payload = {
        sub:user._id,
        name:user.name
    }
    const token = await jwt.sign(payload,secretKey,{
        algorithm:"HS512",
        expiresIn:process.env.JWT_EXPIRES_IN
    })
    return res.status(201).json({
        success:true,
        token,
        message:"success"
    })

}
const tokenCheck= async(req,res,next)=>{
    const ReqHeaderToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
    if(!ReqHeaderToken)
        throw new APIError("Invalid Session. Please sign in!",401)
    const token = req.headers.authorization.split(" ")[1]
    await jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,decoded)=>{
        if(err)  throw new APIError("Invalid Token",401)
        const userInfo  = await userSchema.findById(decoded.sub).select("_id name")
        if(!userInfo) throw new APIError("Invalid Token",401)
        req.user  =  userInfo       
        next()

    })
}

module.exports ={ createToken,tokenCheck}