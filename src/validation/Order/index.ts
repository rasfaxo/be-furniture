import { orderSchema, updateOrderSchema } from "./schema";
import { OrderStatus } from "@prisma/client";
import InvariantError from "../../utils/exceptions/InvariantError";

interface OrderValidator {
  id?: number;
  user_id: number;
  cart_id: number;
  total_price: number;
  status: OrderStatus;
}

const OrderValidator = {
    validateOrderPayload: (payload: OrderValidator) => {
    const { error } = orderSchema.validate(payload);
    if (error) {
      if (error) {
        throw new InvariantError(error.details[0].message);
      }
    }
  },

  validateUpdateOrderPayload: (payload: OrderValidator) => {
    const { error } = updateOrderSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

export default OrderValidator;
