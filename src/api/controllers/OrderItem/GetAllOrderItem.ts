import { Request, Response } from "express";
import orderItemService from "../../../libs/services/OrderItem";

interface GetOrderItemsQuery extends Request {
  page?: string;
  limit?: string;
}

export const getAllOrderItem = async (
  req: GetOrderItemsQuery,
  res: Response
): Promise<Response> => {
  const { page = "1", limit = "10" } = req.query;

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);

  const skip = (pageNum - 1) * limitNum;

  const orderItems = await orderItemService.getAllOrderItems(skip, limitNum);
  const totalItems = await orderItemService.countOrderItems();

  return res.status(200).json({
    success: true,
    currentPage: pageNum,
    totalPages: Math.ceil(totalItems / limitNum),
    totalData: totalItems,
    data: orderItems,
  });
};
