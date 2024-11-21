import { Request, Response } from "express";
import CheckoutService from "../../../libs/services/CheckOut";

interface GetCheckoutsQuery {
  page?: string;
  limit?: string;
}

export const getAllCheckouts = async (
  req: Request<{}, {}, {}, GetCheckoutsQuery>,
  res: Response
): Promise<Response> => {
  const { page = "1", limit = "10" } = req.query;
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const checkouts = await CheckoutService.getAllCheckouts(skip, limitNum);
  const totalCheckouts = await CheckoutService.countTotalCheckouts();

  return res.status(200).json({
    success: true,
    current_page: pageNum,
    total_page: Math.ceil(totalCheckouts / limitNum),
    total_data: totalCheckouts,
    data: checkouts,
  });
};