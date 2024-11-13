import { Request, Response } from "express";
import OrderService from "../../../libs/services/Order";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getOrderById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const order = await OrderService.getOrderById(Number(id));

  if (!order) {
    throw new NotFoundError("Order not found!");
  }

  return res.status(200).json({
    success: true,
    message: "Successfully get order by id!",
    data: order,
  });
};
