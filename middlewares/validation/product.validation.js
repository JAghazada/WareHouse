const joi = require("joi");
const APIError = require("../../utils/errors");
const Response = require("../../utils/response");
class ProductValidation {
  constructor() { }
  static addProduct = async (req, res, next) => {
    const schema = await joi.object({
      ProductName: joi.string().required().messages({
        "any.required": "100*Məhsul Adı boş ola bilməz.",
        "string.empty": "100*Məhsul Adı boş ola bilməz."
      }),
      CompanyName: joi.string().optional().empty(""),
      Unit1: joi.number().optional().empty(""),
      Unit2: joi.number().optional().empty(""),
      NumberOfProducts: joi.number().required().messages({
        "any.required": "110*Məhsul sayı 0 ola bilməz.",
        'number.base': '110*Məhsul sayı 0 ola bilməz',
        'number.integer': '110*Məhsul sayı 0 ola bilməz',
      
      }),
      UnitOfMeasurment: joi.string().required().messages({
        "any.required": "120*Ölçü vahidi 1-i teyin elə",
        "number.base": "120*Ölçü vahidi 1-i rəqəm olmalıdır",
      }),
      SecondUnitOfMeasurment: joi.string().required().messages({
        "any.required": "130*Ölçü vahidi 2-i teyin elə",
        "number.base": "130*Ölçü vahidi 2-i rəqəm olmalıdır",
      }),
      PurchasePrice: joi.number().required().messages({
        "any.required": "140*Alış  qiymətini təyin elə",
        "number.base": "140*Alış  qiyməti rəqəm olmalıdır",

      }),
      SellingPrice: joi.number().required().messages({
        "any.required": "150*Satış  qiymətini təyin elə",
        "number.base": "150*Satış  qiyməti rəqəm olmalıdır",

      }),
      files: joi.optional().empty(""),
      QRcode: joi.string().required().messages({
        "any.required": "160*QRcode boş ola bilməz",
        "array.empty": "160*QRcode boş ola bilməz"
      }),
      MainCode: joi.string().required().custom((value, helper) => {
        const MainCode = parseFloat(value)
        const MatchCode = parseFloat(JSON.parse(req.body.QRcode)[0]);
        console.log(MainCode);
        console.log(MatchCode);
        if (MainCode !== MatchCode || !MainCode || !MatchCode ) {
          return helper.error('custom.error', { message: '160*QRcode da xəta var' }) 
        }
        return value
      }).messages({
        'custom.error': '{{#message}}'
      }),
      Link: joi.string().optional().empty(""),
      // İmage: joi.object().required(),
    });
    const { error, value } = schema.validate(req.body, {
      abortEarly: false // Include all validation errors
    });
   
    if(error){
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      res.status(400).json({ error: errorMessage });
    }else{
      next();

    }
     
   
    
  };
}
module.exports = ProductValidation;
