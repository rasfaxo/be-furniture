import Joi from "joi";

const createShippingSchema = Joi.object({
    order_id: Joi.number().required(),
    address_id: Joi.number().optional(),
    shipping_cost: Joi.number().optional(),
    shipping_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
    status: Joi.string().valid("Pending", "Processing", "In_Transit", "Shipped", "Delivered", "Cancelled").optional(),
})

const  updateShippingSchema = Joi.object({
    id: Joi.number().required(),
    order_id: Joi.number().optional(),
    address_id: Joi.number().optional(),
    shipping_cost: Joi.number().optional(),
    // shipping_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
    status: Joi.string().valid("Pending", "Processing","In_Transit", "Shipped", "Delivered", "Cancelled").optional(),
})

export {createShippingSchema,updateShippingSchema}