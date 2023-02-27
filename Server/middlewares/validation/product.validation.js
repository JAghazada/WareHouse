const joi = require("joi");
const APIError = require("../../utils/errors");
const Response = require("../../utils/response");
class ProductValidation {
  constructor() {}
  static addProduct = async (req, res, next) => {
    const schema = await joi.object({
      ProductName: joi.string().required(),
      NumberOfProducts: joi.number().required(),
      OneProductContentCount: joi.allow(),
      UnitOfMeasurment: joi.string().required(),
      PurchasePrice: joi.number().required(),
      SellingPrice: joi.number().required(),
      QRcode: joi.string().required(),
      MainCode: joi.string().required(),
      Link: joi.string(),
      // İmage: joi.object().required(),
    });
    try {
      const value = await schema.validateAsync(req.body);
      next();
    } catch (error) {
      if (error.details && error?.details[0].message)
        throw new APIError(error.details[0].message, 400);
      else throw new APIError("Please comply with validation rules", 400);
    }
  };
}
module.exports = ProductValidation;
