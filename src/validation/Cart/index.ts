
import InvariantError from "../../utils/exceptions/InvariantError";

import {
    createCartSchema,
    updateCartSchema,
    getAllCartSchema
} from "./schema";


 interface CartPayload {
    id?: number;
    user_id: number;
    total_price?: number;
}

const CartValidation = {
    validatePayloadCart(payload: CartPayload): void {
        const { error } = createCartSchema.validate(payload);
        if(error){
            throw new InvariantError(error.details[0].message);
        }
    },
    validationGetAllCart(payload: CartPayload): void {
        const {error} = getAllCartSchema.validate(payload);
        if(error) {
            throw new InvariantError(error.details[0].message);
        }
    },
    validationUpdateCart(payload: CartPayload): void {
        const {error} = updateCartSchema.validate(payload);
        if(error) {
            throw new InvariantError(error.details[0].message);
        }
    },
};

export default CartValidation