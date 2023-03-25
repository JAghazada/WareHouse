function requireLogin(req,res,next){
    if(req.session && req.session.userID)
    next()
    else
    res.render("auth")
}
module.exports = requireLogin