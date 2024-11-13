import { Request, Response } from "express";
import OrderService from "../../../libs/services/Order";

interface GetOrdersQuery extends Request {
  page?: string;
  limit?: string;
}

export const getAllOrders = async (
  req: GetOrdersQuery,
  res: Response
): Promise<Response> => {
  const { page = 1, limit = 10 } = req.query;

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);

  const skip = (pageNum - 1) * limitNum;

  const orders = await OrderService.getAllOrders(skip, limitNum);
  const totalOrders = await OrderService.countOrders();

  return res.status(200).json({
    success: true,
    current_page: pageNum,
    total_page: Math.ceil(totalOrders / limitNum),
    total_data: totalOrders,
    data: orders,
  });
};
