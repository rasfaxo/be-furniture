import joi from "joi";

const checkoutStatus = ["Pending", "Completed", "Failed", "Cancelled"];

const createCheckoutSchema = joi.object({
    user_id: joi.number().required().messages({
        "number.base": "User ID harus berupa angka",
        "any.required": "User ID harus diisi"
    }),
    cart_id: joi.number().required().messages({
        "number.base": "Cart ID harus berupa angka",
        "any.required": "Cart ID harus diisi"
    }),
    payment_id: joi.number().required().messages({
        "number.base": "Payment ID harus berupa angka",
        "any.required": "Payment ID harus diisi"
    }),
    shipping_id: joi.number().required().messages({
        "number.base": "Shipping ID harus berupa angka",
        "any.required": "Shipping ID harus diisi"
    }),
    address_id: joi.number().required().messages({
        "number.base": "Address ID harus berupa angka",
        "any.required": "Address ID harus diisi"
    }),
    status: joi.string().valid(...checkoutStatus).required().messages({
        "string.base": "Status harus berupa string",
        "any.required": "Status harus diisi",
        "any.only": `Status harus salah satu dari ${checkoutStatus.join(", ")}`
    }),
    total_price: joi.number().required().messages({
        "number.base": "Total price harus berupa angka",
        "any.required": "Total price harus diisi",
    }),
});

const updateCheckoutSchema = joi.object({
    id: joi.number().required().messages({
        "number.base": "ID harus berupa angka",
        "any.required": "ID harus diisi"
    }),
    status: joi.string().valid(...checkoutStatus).required().messages({
        "string.base": "Status harus berupa string",
        "any.required": "Status harus diisi",
        "any.only": `Status harus salah satu dari ${checkoutStatus.join(", ")}`
    }),
});

export { createCheckoutSchema, updateCheckoutSchema };