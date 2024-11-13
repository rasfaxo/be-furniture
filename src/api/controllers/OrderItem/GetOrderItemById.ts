import { Request, Response } from "express";
import orderItemService from "../../../libs/services/OrderItem";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const GetOrderItemById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const result = await orderItemService.getOrderItemById(parseInt(id));
  if (!result) {
    throw new NotFoundError("Order item not found!");
  }

  return res.status(200).json({
    success: true,
    message: "Successfully get order item by id!",
    data: result,
  });
};
