const joi = require("joi");
const APIError = require("../../utils/errors");
const Response = require("../../utils/response");
class ProductValidation {
  constructor() {}
  static addProduct = async (req, res, next) => {
    const schema = await joi.object({
      ProductName: joi.string().required(),
      CompanyName: joi.string().optional(),
      Unit1: joi.number().optional(),
      Unit2: joi.number().optional(),
      NumberOfProducts: joi.number().required(),
      UnitOfMeasurment: joi.string().required(),
      SecondUnitOfMeasurment: joi.string().required(),
      PurchasePrice: joi.number().required(),
      SellingPrice: joi.number().required(),
      files:joi.optional(),
      QRcode: joi.string().required(),
      MainCode: joi.string().required().custom((value,helper)=>{
        const MainCode = parseFloat(value)
        const MatchCode = parseFloat(req.body.QRcode.split(",")[0])
        if(MainCode!==MatchCode) throw new APIError("QRcode -da xeta bash verdi");
        
      }),
      Link: joi.string().optional(),
      // İmage: joi.object().required(),
    });
    try {
      const value =  schema.validateAsync(req.body);
      next();
    } catch (error) {
      if (error.details && error?.details[0].message)
        throw new APIError(error.details[0].message, 400);
      else throw new APIError("Please comply with validation rules", 400);
    }
  };
}
module.exports = ProductValidation;
