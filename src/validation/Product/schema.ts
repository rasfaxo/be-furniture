import Joi from "joi";

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number(),
  stock: Joi.number(),
  category_id: Joi.number().required(),
  image_url: Joi.string(),
});

const getAllProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  category_id: Joi.number().required(),
  image_url: Joi.string(),
});

const updateProductSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  category_id: Joi.number().required(),
  image_url: Joi.string(),
});

export { createProductSchema, getAllProductSchema, updateProductSchema };
