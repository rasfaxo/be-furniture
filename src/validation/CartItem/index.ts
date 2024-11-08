import InvariantError from "../../utils/exceptions/InvariantError";

import {
createCartItemSchema,
getAllCartItemSchema,
updateCartItemSchema
} from "./schema"

interface CartItemPayload{
    id?:number,
    cart_id?:number,
    product_id?:number,
    quantity?: number,
    subtotal_price?:number
}

const CartItemValidation = {
    validatePayloadCartItem  (payload:CartItemPayload): void{
        const {error} = createCartItemSchema.validate(payload)
        if (error) {
            throw new InvariantError(error.details[0].message)
        }
    },
    validationGetAllCartItem(payload:CartItemPayload): void {
        const {error} = getAllCartItemSchema.validate(payload)
        if (error) {
            throw new InvariantError(error.details[0].message)
        }
     },
     validationUpdateCartItem(payload:CartItemPayload): void{
        const {error} = updateCartItemSchema.validate(payload)
        if (error) {
            throw new InvariantError(error.details[0].message)
        }
     }
}

export default  CartItemValidation


