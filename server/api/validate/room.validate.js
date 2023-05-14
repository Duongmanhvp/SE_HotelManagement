const Joi = require("joi");

const roomSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  images: Joi.any(),
  price: Joi.number().required(),
  security_deposit: Joi.number().required(),
  cleaning_fee: Joi.number().required(),
  property_type: Joi.string().required(),
  room_type: Joi.required(),
  bed_type: Joi.required(),
  minimum_nights: Joi.any(),
  maximum_nights: Joi.any(),
  amenities: Joi.array().required(),
  bedrooms: Joi.number().required().min(1),
  beds: Joi.number().required().min(1),
  bathrooms: Joi.number().required().min(1),
  guests_included: Joi.number().required().min(1),
  host: Joi.object().required(),
  address: Joi.object().required(),
});

module.exports = roomSchema;
