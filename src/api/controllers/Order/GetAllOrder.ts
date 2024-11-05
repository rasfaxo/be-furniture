import { Request, Response } from "express";
import OrderService from "../../../libs/services/Order";
import InvariantError from "../../../utils/exceptions/InvariantError";

interface GetOrdersQuery extends Request {
    page?: string;
    limit?: string;
}

export const getAllOrders = async (
    req: GetOrdersQuery,
    res: Response
): Promise<Response> => {
  try {
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
  } catch (error) {
    if (error instanceof InvariantError) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
    
    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
  }
}