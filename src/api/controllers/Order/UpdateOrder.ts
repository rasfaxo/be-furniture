import { Request, Response } from "express";
import orderService from "../../../libs/services/Order";
import userService from "../../../libs/services/Users";
import cartService from "../../../libs/services/Cart";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import OrderValidator from "../../../validation/Order";

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, user_id, cart_id, total_price, status } = req.body;

  OrderValidator.validateUpdateOrderPayload({
    id,
    user_id,
    cart_id,
    total_price,
    status,
  });

  const checkUniqueId = await orderService.getOrderById(Number(id));
  const checkUniqueUserId = await userService.getUserById(Number(user_id));
  const checkUniqueCartId = await cartService.getCartById(Number(cart_id));
  if (!checkUniqueId) {
    throw new NotFoundError("Order id not found!");
  }

  if (!checkUniqueUserId) {
    throw new NotFoundError("User id not found!");
  }

  if (!checkUniqueCartId) {
    throw new NotFoundError("Cart id not found!");
  }

  await orderService.updateOrder(parseInt(id), {
    user_id,
    cart_id,
    total_price,
    status,
  });

  return res.status(200).json({
    success: true,
    message: "Successfully update order!",
  });
};
