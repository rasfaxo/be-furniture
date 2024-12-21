import Joi from "joi";

const createMitraSchema = Joi.object({
  user_id: Joi.number().required(),
  company_name: Joi.string().min(3).required(),
  business_type: Joi.string().min(3).required(),
  address: Joi.string().allow("", null).optional(),
  contact_info: Joi.string().min(10).required(),
});

const updateMitraSchema = Joi.object({
  id: Joi.number().required(),
  company_name: Joi.string().min(3).optional(),
  business_type: Joi.string().min(3).optional(),
  address: Joi.string().allow("", null).optional(),
  contact_info: Joi.string().min(10).optional(),
  user_id: Joi.number().required(),
});

const getMitraByIdSchema = Joi.object({
  id: Joi.number().required(),
});

export { createMitraSchema, updateMitraSchema, getMitraByIdSchema };
