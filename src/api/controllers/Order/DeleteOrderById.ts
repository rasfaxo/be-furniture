import { Request, Response } from "express";
import OrderService from "../../../libs/services/Order";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteOrderByid = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const checkUniqueId = await OrderService.getOrderById(parseInt(id));

  if (!checkUniqueId) {
    throw new NotFoundError("Order id not found!");
  }

  await OrderService.deleteOrderById(parseInt(id));
  return res.status(200).json({
    success: true,
    message: "Successfully delete order by id!",
  });
};
