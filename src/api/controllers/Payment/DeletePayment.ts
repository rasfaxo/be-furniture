import { Request, Response } from "express";
import PaymentService from "../../../libs/services/Payment";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deletePayment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const checkUniqueId = await PaymentService.getPaymentById(Number(id));

  if (!checkUniqueId) {
    throw new NotFoundError("Id not found!");
  }

  await PaymentService.deletePaymentById(Number(id));
  return res.status(200).json({
    success: true,
    message: "Successfully deleted payment!",
  });
};
