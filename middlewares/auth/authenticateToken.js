const jwt = require("jsonwebtoken")
const authenticateToken = (req, res, next) => {
    try {
        const token = req.cookies.auth;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
                if (err) {
                    res.redirect("/login");
                } else {
                    next()
                }
            })
        } else {
            res.redirect("/login");
        }
    }
    catch (err) {
        res.redirect("/login");
    }
};

module.exports = authenticateToken