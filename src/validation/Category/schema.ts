import Joi from "joi";

const createCategorySchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().optional(),
});

export { createCategorySchema };
