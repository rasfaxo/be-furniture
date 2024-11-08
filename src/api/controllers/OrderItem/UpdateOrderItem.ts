import { Request, Response } from "express";
import Decimal from "decimal.js";

import orderItemService from "../../../libs/services/OrderItem";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import InvariantError from "../../../utils/exceptions/InvariantError";
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
    try {
        const { id, order_id, product_id, quantity, price } = req.body;

        OrderItemValidator.validateUpdateOrderItemPayload({
            id,
            order_id,
            product_id,
            quantity,
            price,
        });

        const existingOrderItem = await orderItemService.getOrderItemById(Number(id));

        if (!existingOrderItem) {
            throw new NotFoundError("Order item tidak ditemukan");
        }

        const updatedOrderItem = await orderItemService.updateOrderItemById(Number(id), {
            order_id,
            product_id,
            quantity,
            price: price !== undefined ? new Decimal(price) : existingOrderItem.price, // Menggunakan existing price jika price tidak diberikan
        });

        return res.status(200).json({
            success: true,
            message: "Order item berhasil diubah!",
            data: updatedOrderItem,
        });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
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
