import { valid } from "joi";
import InvariantError from "../../utils/exceptions/InvariantError";

import {
    createAddressSchema,
    updateAddressSchema
} from "./schema" 


interface AddressPayload {
    id?: number
    user_id?: number
    street?: string
    city?: string
    state?: string
    postal_code?: string
    country?: string
}

const AddressValidator = {
    validateCreateAddress(payload:AddressPayload) : void {
        const { error } = createAddressSchema.validate(payload);

        if(error) {
            throw new InvariantError(error.details[0].message)
        }
    },

    validateUpdateAdress(payload:AddressPayload) : void {
        const { error } = updateAddressSchema.validate(payload);

        if(error) {
            throw new InvariantError(error.details[0].message)
        }
    }
}

export default AddressValidator