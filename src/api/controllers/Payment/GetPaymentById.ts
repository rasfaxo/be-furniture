import { Request, Response } from "express";
import PaymentService from "../../../libs/services/Payment";
import NotFoundError from "..//../../utils/exceptions/NotFoundError";

export const getPaymentById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const payment = await PaymentService.getPaymentById(Number(id));

  if (!payment) {
    throw new NotFoundError("Payment id not found");
  }

  return res.status(200).json({
    success: true,
    message: "Successfully get payment by id",
    data: payment,
  });
};
