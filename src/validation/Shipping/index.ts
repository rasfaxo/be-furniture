import InvariantError from "../../utils/exceptions/InvariantError";
import { createShippingSchema, updateShippingSchema } from "./schema";


interface ShippingValidator {
    id?:number,
    order_id?:number,
    address_id?:number,
    shipping_cost?:number,
    shipping_date?:Date,
    status?:string
}


const ShippingValidator = {
    validateCreateShippingPayLoad: (payload:ShippingValidator) => {
     const {error} = createShippingSchema.validate(payload);
     if(error){
         throw new InvariantError(error.details[0].message);
     }   
},
    validateUpdateShippingPayLoad: (payload:ShippingValidator) => {
        const {error} = updateShippingSchema.validate(payload);
        if(error){
            throw new InvariantError(error.details[0].message);
        }
    },


};

export default ShippingValidator