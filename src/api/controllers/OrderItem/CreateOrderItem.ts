import { Request, Response } from "express";
import OrderItemService from "../../../libs/services/OrderItem";
import OrderService from "../../../libs/services/Order";
import OrderItemValidator from "../../../validation/OrderItem";
import productService from "../../../libs/services/Product";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

interface CreateOrderItemRequest extends Request {
  body: {
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
  };
}

export const createOrderItem = async (
  req: CreateOrderItemRequest,
  res: Response
): Promise<Response> => {
  const { order_id, product_id, quantity, price } = req.body;

  OrderItemValidator.validateCreateOrderItemPayload({
    order_id,
    product_id,
    quantity,
    price,
  });

  const checkUniqueOrderId = await OrderService.getOrderById(order_id);

  const checkUniqueProductId = await productService.getProductById(product_id);

  if (!checkUniqueOrderId) {
    throw new NotFoundError("Order id not found!");
  }

  if (!checkUniqueProductId) {
    throw new NotFoundError("Product id not found!");
  }

  await OrderItemService.createOrderItem(order_id, product_id, quantity, price);

  return res.status(200).json({
    success: true,
    message: "Successfully create order item!",
  });
};
