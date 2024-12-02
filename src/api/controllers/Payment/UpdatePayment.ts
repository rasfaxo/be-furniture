import { Request, Response } from "express";
import { PaymentMethod, PaymentStatus } from "@prisma/client";
import PaymentService from "../../../libs/services/Payment";
import orderService from "../../../libs/services/Order"
import PaymentValidator from "../../../validation/Payment";
import moment from "moment";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import Decimal from "decimal.js";

interface UpdatePaymentRequest extends Request {
  body: {
    id: number;
    order_id: number;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    payment_date: Date;
    amount: number;
  };
}

export const updatePayment = async (
  req: UpdatePaymentRequest,
  res: Response
): Promise<Response> => {
  const { id, order_id, payment_method, payment_status, payment_date, amount } =
  req.body;
  
  const checkUniquePaymentId = await PaymentService.getPaymentById(id);
  const checkOrderId = await orderService.getOrderById(order_id)

  if (!checkUniquePaymentId) {
    throw new NotFoundError("Payment id not found!");
  }

  if (!checkOrderId) {
    throw new NotFoundError(" Order Id not found")
  }

  const formatedPaymentDate = moment(payment_date).toDate();

  PaymentValidator.validateUpdatePaymentPayload({
    id,
    order_id,
    payment_method,
    payment_status,
    payment_date: formatedPaymentDate,
    amount
  });


  const updatePayment = await PaymentService.updatePaymentById(id, {
    order_id,
    payment_method,
    payment_status,
    payment_date,
    amount:amount !== undefined ? new Decimal(amount) : new Decimal(checkOrderId.total_price)
  });

  return res.status(200).json({
    success: true,
    message: "Successfully update payment!",
    data: updatePayment,
  });
};
