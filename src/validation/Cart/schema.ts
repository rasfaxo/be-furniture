import Joi from "joi";

const createCartSchema = Joi.object({
    user_id:Joi.number().required(),
    total_price:Joi.number().required(),
});

const updateCartSchema = Joi.object({
    id:Joi.number().required(),
    user_id:Joi.number().required(),
    total_price:Joi.number().required(),
});

const getAllCartSchema = Joi.object({
    user_id:Joi.number().required(),
    total_price:Joi.number().required(),
});

export {
    createCartSchema,
    updateCartSchema,
    getAllCartSchema
}