import { createPaymentSchema, updatePaymentSchema } from "./schema";
import InvariantError from "../../utils/exceptions/InvariantError";
import { PaymentMethod } from "@prisma/client";
import { PaymentStatus } from "@prisma/client";

interface PaymentValidator {
  id?: number;
  order_id: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  payment_date: Date;
  amount: number;
}

const PaymentValidator = {
  validatePaymentPayload: (payload: PaymentValidator) => {
    const { error } = createPaymentSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },

  validateUpdatePaymentPayload: (payload: PaymentValidator) => {
    const { error } = updatePaymentSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

export default PaymentValidator;
