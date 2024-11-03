import Joi from "joi";
import { Category_name } from "@prisma/client";

const createCategorySchema = Joi.object({
  category_name: Joi.string()
    .valid(...Object.values(Category_name))
    .min(3)
    .max(30)
    .required()
    .messages({
      "any.required": "Nama kategori tidak boleh kosong",
    }),
});

const updateCategorySchema = Joi.object({
  id: Joi.number().required(),
  category_name: Joi.string()
    .valid(...Object.values(Category_name))
    .min(3)
    .max(30)
    .required()
    .messages({
      "any.required": "Nama kategori tidak boleh kosong",
    }),
});

export { createCategorySchema, updateCategorySchema };
