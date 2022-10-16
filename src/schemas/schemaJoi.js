const Joi = require("joi");
const schemaJoi = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(3)
    .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
    .required(),
});

module.exports = { schemaJoi };
