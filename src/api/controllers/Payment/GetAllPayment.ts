import { Request, Response } from "express";
import PaymentService from "../../../libs/services/Payment";

interface GetPaymentQuery {
  page?: string;
  limit?: string;
}

export const getAllPayment = async (
  req: Request<{}, {}, {}, GetPaymentQuery>,
  res: Response
): Promise<Response> => {
  const { page = "1", limit = "10" } = req.query;
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const payment = await PaymentService.getAllPayment(skip, limitNum);
  const totalPayment = await PaymentService.countPayments();

  return res.status(200).json({
    success: true,
    current_page: pageNum,
    total_page: Math.ceil(totalPayment / limitNum),
    total_data: totalPayment,
    data: payment,
  });
};
