import Joi from "joi";

const orderStatus = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const orderSchema = Joi.object({
  user_id: Joi.number().required().messages({
    "number.base": "User ID harus berupa angka",
    "any.required": "User ID wajib diisi",
  }),
  cart_id: Joi.number().required().messages({
    "number.base": "Cart ID harus berupa angka",
    "any.required": "Cart ID wajib diisi",
  }),
  total_price: Joi.number().required().messages({
    "number.base": "Total price harus berupa angka",
    "any.required": "Total price wajib diisi",
  }),
  status: Joi.string()
    .valid(...orderStatus)
    .required()
    .messages({
      "string.base": "Status harus berupa string",
      "any.required": "Status wajib diisi",
      "any.only": `Status harus salah satu dari ${orderStatus.join(", ")}`,
    }),
});

const updateOrderSchema = Joi.object({
  id: Joi.number().required().messages({
    "number.base": "ID harus berupa angka",
    "any.required": "ID wajib diisi",
  }),
  user_id: Joi.number().required().messages({
    "number.base": "User ID harus berupa angka",
    "any.required": "User ID wajib diisi",
  }),
  cart_id: Joi.number().required().messages({
    "number.base": "Cart ID harus berupa angka",
    "any.required": "Cart ID wajib diisi",
  }),
  total_price: Joi.number().required().messages({
    "number.base": "Total price harus berupa angka",
    "any.required": "Total price wajib diisi",
  }),
  status: Joi.string()
    .valid(...orderStatus)
    .required()
    .messages({
      "string.base": "Status harus berupa string",
      "any.required": "Status wajib diisi",
      "any.only": `Status harus salah satu dari ${orderStatus.join(", ")}`,
    }),
});

export { orderSchema, updateOrderSchema };
