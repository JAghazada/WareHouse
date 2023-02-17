const joi = require("joi")
const APIError = require("../../utils/errors")
class AuthValidation {
    constructor() {

    }
    static register = async(req, res, next) => {
        try {
            await joi.object({
                name: joi.string().trim().min(3).max(12).required().messages({
                    "string.base": " Namespace must be regular text",
                    "string.empty": "Namespace can't be empty",
                    "string.min": "Name have to min 3 characters",
                    "string.max": "Name have to max 12  characters",
                    "string.required": "Name is required"
                }),
                pass: joi.string().trim().min(3).max(12).required().messages({
                    "string.base": " Password must be regular text",
                    "string.empty": "Password can't be empty",
                    "string.min": "Password have to min 3 characters",
                    "string.max": "Password have to max 12  characters",
                    "string.required": "Password is required"
                }),
                repass: joi.string().equal(req.body.pass).trim().min(3).max(12).required().messages({
                    "string.base": " Password must be regular text",
                    "string.empty": "Password can't be empty",
                    "string.min": "Password have to min 3 characters",
                    "string.max": "Password have to max 12  characters",
                    "string.required": "Password is required",
                    "string.equal": "Password and Reppasword must be same"
                }),
                code: joi.boolean().required().messages({
                    "string.base": "code must be boolean",
                    "string.empty": "code can't be empty",

                })
            }).validateAsync(req.body)
        } catch (error) {
            if(error.details && error?.details[0].message)
                 throw new APIError(error.details[0].message, 400)
            else throw new APIError("Please comply with validation rules",400)
        }
        next()
    }
    static login = async(req,res,next)=>{
        try{
            await joi.object({
                name: joi.string().trim().min(3).max(12).required().messages({
                    "string.base": " Namespace must be regular text",
                    "string.empty": "Namespace can't be empty",
                    "string.min": "Name have to min 3 characters",
                    "string.max": "Name have to max 12  characters",
                    "string.required": "Name is required"
                }),
                pass: joi.string().trim().min(3).max(12).required().messages({
                    "string.base": " Password must be regular text",
                    "string.empty": "Password can't be empty",
                    "string.min": "Password have to min 3 characters",
                    "string.max": "Password have to max 12  characters",
                    "string.required": "Password is required"
                })
            }).validateAsync(req.body)
        }
        catch (error) {
            if(error.details && error?.details[0].message)
                 throw new APIError(error.details[0].message, 400)
            else throw new APIError("Please comply with validation rules",400)
        }
        next()

    }
}
module.exports = AuthValidation