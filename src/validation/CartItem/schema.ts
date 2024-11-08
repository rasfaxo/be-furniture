import Joi from "joi";

const createCartItemSchema = Joi.object({
    cart_id: Joi.number().required(),
    product_id: Joi.number().required(), 
     quantity: Joi.number().required(),
     subtotal_price: Joi.number().required()
});

const updateCartItemSchema = Joi.object({
    id: Joi.number().required(),
    cart_id: Joi.number().required(),
    product_id: Joi.number().required(), 
    quantity: Joi.number().required(),
    subtotal_price: Joi.number().required()
});

const getAllCartItemSchema = Joi.object({
    cart_id: Joi.number().required(),
    product_id: Joi.number().required(), 
    quantity: Joi.number().required(),
    subtotal_price: Joi.number().required()
});



export {
    createCartItemSchema,
    getAllCartItemSchema,
    updateCartItemSchema
}