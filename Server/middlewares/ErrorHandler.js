const APIError = require("../utils/errors")
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof APIError) {
        return res.status(err.status || 400)
            .json({
                success: false,
                message: err.message
            })
    }
    return res.status(500).json({
        success: false,
        message: "Server Error Occured,check error api !"
    })
}
module.exports = errorHandlerMiddleware