import { Request, Response } from "express";
import orderItemService from "../../../libs/services/OrderItem";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const GetOrderItemById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const orderItem = await orderItemService.getOrderItemById(parseInt(id));
    if (!orderItem) {
      throw new NotFoundError("Order item tidak ditemukan");
    }
    
    return res.status(200).json({
      success: true,
      message: "Order item ditemukan",
      data: orderItem,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

