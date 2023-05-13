import Joi, { any } from "joi";

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).max(24).required(),
  phone: Joi.string().length(10).required(),
  birthday: Joi.date().required(),
  gender: Joi.string().required(),
});

export default registerSchema;
