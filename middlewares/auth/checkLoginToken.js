const jwt = require("jsonwebtoken")
const checkLoginToken = (req, res, next) => {
    try {
        const token = req.cookies.auth;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
                if (err) {
                    next()
                } else {
                    res.redirect("/products")
                }
            })
        } else {
            next();
        }
    }
    catch (err) {
        next()
    }
};

module.exports = checkLoginToken