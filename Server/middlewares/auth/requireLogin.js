function requireLogin(req,res,next){
    if(req.session && req.session.userID)
    next()
    else
    res.redirect("/")
}
function redirectLoggedUser (req,res,next){
    if(req.session.userID)  res.redirect("/products")
    else next()
}
module.exports = {requireLogin,redirectLoggedUser}