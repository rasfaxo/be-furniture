import Joi from "joi";

const createOrderItemSchema = Joi.object({
  order_id: Joi.number().required(),
  product_id: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
  price: Joi.number().positive().required(),
  created_at: Joi.date().default(() => new Date()),
  updated_at: Joi.date().default(() => new Date()),
});

const updateOrderItemSchema = Joi.object({
  id: Joi.number().required(),
  order_id: Joi.number().optional(),
  product_id: Joi.number().optional(),
  quantity: Joi.number().min(1).optional(),
  price: Joi.number().positive().optional(),
  updated_at: Joi.date().default(() => new Date()),
});

export { createOrderItemSchema, updateOrderItemSchema };
