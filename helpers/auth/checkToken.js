const jwt = require("jsonwebtoken")
const checkToken = (req,res,next)=>{
    const {originalUrl} = req;
    const token = req.cookies.auth;
    if(!token){
        if(originalUrl === "/login" || originalUrl === "/register"){
            return next();
        }
        return res.redirect("/login")
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

        const currentTime = Math.floor(Date.now() / 1000);
        req.userID = decoded.userID;
        req.userName = decoded.userName;
        req.permission = decoded.permission;
        if(originalUrl === "/login" || originalUrl === "/register"){
            return res.redirect("/products")
        }
        next();

    } catch (error) {
        // return res.status(401).json({
            // message:"Sizin sessiyanızın vaxtı bitib",
            // success:false
        // })
        if(originalUrl === "/login" || originalUrl === "/register"){
            return next()
        }
        return res.redirect("/products")

    }
}

module.exports = {checkToken}