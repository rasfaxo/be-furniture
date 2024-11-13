import { Request, Response } from "express";
import Decimal from "decimal.js";
import orderItemService from "../../../libs/services/OrderItem";
import orderService from "../../../libs/services/Order";
import productService from "../../../libs/services/Product";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import OrderItemValidator from "../../../validation/OrderItem";

interface UpdateOrderItemRequest extends Request {
  body: {
    id?: number;
    order_id?: number;
    product_id?: number;
    quantity?: number;
    price?: number;
  };
}

export const updateOrderItem = async (
  req: UpdateOrderItemRequest,
  res: Response
): Promise<Response> => {
  const { id, order_id, product_id, quantity, price } = req.body;

  OrderItemValidator.validateUpdateOrderItemPayload({
    id,
    order_id,
    product_id,
    quantity,
    price,
  });

  const checkUniqueId = await orderItemService.getOrderItemById(Number(id));

  const checkUniqueOrderId = await orderService.getOrderById(Number(order_id));

  const checkUniqueProductId = await productService.getProductById(
    Number(product_id)
  );

  if (!checkUniqueId) {
    throw new NotFoundError("Order item id not found!");
  }

  if (!checkUniqueOrderId) {
    throw new NotFoundError("Order id not found!");
  }

  if (!checkUniqueProductId) {
    throw new NotFoundError("Product id not found!");
  }

  await orderItemService.updateOrderItemById(Number(id), {
    order_id,
    product_id,
    quantity,
    price: price !== undefined ? new Decimal(price) : checkUniqueId.price,
  });

  return res.status(200).json({
    success: true,
    message: "Successfully update order item!",
  });
};
