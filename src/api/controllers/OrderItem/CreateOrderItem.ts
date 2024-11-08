import { Request, Response } from "express";
import OrderItemService from "../../../libs/services/OrderItem";
import OrderItemValidator from "../../../validation/OrderItem";
import InvariantError from "../../../utils/exceptions/InvariantError";

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
  try {
    const { order_id, product_id, quantity, price } = req.body;

    OrderItemValidator.validateCreateOrderItemPayload({
      order_id,
      product_id,
      quantity,
      price,
    });

    const newOrderItem = await OrderItemService.createOrderItem(
      order_id,
      product_id,
      quantity,
      price,
    );

    return res.status(200).json({
      status: true,
      message: "Order item berhasil dibuat!",
      data: newOrderItem,
    });
  } catch (error) {
    if (error instanceof InvariantError) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      status: false,
      message: "Terjadi kesalahan pada server!",
    });
  }
};
