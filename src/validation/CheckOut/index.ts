import { createCheckoutSchema, updateCheckoutSchema } from "./schema";
import { CheckoutStatus } from "@prisma/client";
import InvariantError from "../../utils/exceptions/InvariantError";

interface CheckoutValidator {
    id?: number,
    user_id: number,
    cart_id: number,
    payment_id: number,
    shipping_id: number,
    address_id: number,
    status: CheckoutStatus,
    total_price: number
}

const CheckoutValidator = {
    validateCheckoutPayload: (payload: CheckoutValidator) => {
        const { error } = createCheckoutSchema.validate(payload)
        if (error) {
            throw new InvariantError(error.details[0].message);
        }
    },

    validateUpdateCheckoutPayload: (payload: CheckoutValidator) => {
        const { error } = updateCheckoutSchema.validate(payload);
        if (error) {
            throw new InvariantError(error.details[0].message)
        }
    },
};