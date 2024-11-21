import Joi from "joi";

const createAddressSchema = Joi.object({
    user_id: Joi.number().optional(),
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    postal_code: Joi.string().optional(),
    country: Joi.string().optional()
})

const updateAddressSchema = Joi.object({
    id: Joi.number().required(),
    user_id: Joi.number().optional(),
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    postal_code: Joi.string().optional(),
    country: Joi.string().optional()
})

export {createAddressSchema,updateAddressSchema}