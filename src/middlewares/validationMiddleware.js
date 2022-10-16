const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
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
      favorite: Joi.boolean(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(JSON.stringify(validationResult.error.details)));
    }

    next();
  },
};
