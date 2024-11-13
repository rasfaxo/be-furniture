import { Request, Response } from "express";
import orderItemService from "../../../libs/services/OrderItem";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteOrderItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const checkUniqueId = await orderItemService.getOrderItemById(parseInt(id));

  if (!checkUniqueId) {
    throw new NotFoundError("Order item not found!");
  }

  await orderItemService.deleteOrderItemById(parseInt(id));

  return res.status(200).json({
    success: true,
    message: "Successfully delete order item!",
  });
};
