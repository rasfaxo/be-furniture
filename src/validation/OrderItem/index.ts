import InvariantError from "../../utils/exceptions/InvariantError";
import { createOrderItemSchema, updateOrderItemSchema } from "./schema";

interface OrderItemValidator {
  id?: number;
  order_id?: number;
  product_id?: number;
  quantity?: number;
  price?: number;
}

const OrderItemValidator = {
  validateCreateOrderItemPayload: (payload: OrderItemValidator) => {
    const { error } = createOrderItemSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },

  validateUpdateOrderItemPayload: (payload: OrderItemValidator) => {
    const { error } = updateOrderItemSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

export default OrderItemValidator;
