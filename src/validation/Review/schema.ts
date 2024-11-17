import Joi from "joi";

const createReviewSchema = Joi.object({
  user_id: Joi.number().required().messages({
    "number.base": "User ID harus berupa angka",
    "any.required": "User ID wajib diisi",
  }),
  product_id: Joi.number().required().messages({
    "number.base": "Product ID harus berupa angka",
    "any.required": "Product ID wajib diisi",
  }),
  rating: Joi.number().required().min(1).max(5).messages({
    "number.base": "Rating harus berupa angka",
    "any.required": "Rating wajib diisi",
    "number.min": "Rating minimal adalah 1",
    "number.max": "Rating maksimal adalah 5",
  }),
  review_content: Joi.string().required().messages({
    "string.base": "Review content harus berupa string",
    "any.required": "Review content wajib diisi",
  }),
});

const updateReviewSchema = Joi.object({
  id: Joi.number().required().messages({
    "number.base": "ID harus berupa angka",
    "any.required": "ID wajib diisi",
  }),
  user_id: Joi.number().optional(),
  product_id: Joi.number().optional(),
  rating: Joi.number().optional().min(1).max(5),
  review_content: Joi.string().optional(),
});

export { createReviewSchema, updateReviewSchema };
