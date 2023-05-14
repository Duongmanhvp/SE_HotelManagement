const Joi = require("joi");
const subYears = require("date-fns/subYears");

const userSchema = Joi.object({
  _id: Joi.any(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).max(24).required(),
  phone: Joi.string().length(10).required(),
  birthday: Joi.date().max(subYears(new Date(), 18)).required(),
  gender: Joi.string().required(),
  role: Joi.any(),
  __v: Joi.any(),
});

module.exports = userSchema;
