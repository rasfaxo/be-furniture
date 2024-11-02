import Joi from "joi";

const createProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
   category_id: Joi.number().required(),
});

const getAllProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    category_id: Joi.number().required(),
});

const  updateProductSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    category_id: Joi.number().required(),
});

export {
    createProductSchema,
    getAllProductSchema,
    updateProductSchema
}