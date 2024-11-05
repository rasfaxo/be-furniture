import { Request, Response } from "express";
import { order_status } from "@prisma/client";
import OrderService from "../../../libs/services/Order";
import OrderValidator from "../../../validation/Order";
import InvariantError from "../../../utils/exceptions/InvariantError";

interface CreateOrderRequest extends Request {
    body: {
        user_id: number;
        cart_id: number;
        total_price: number;
        status: order_status;
    };
}

export const createOrder = async (
    req: CreateOrderRequest,
    res: Response
): Promise<Response> => {
    try {
        const { user_id, cart_id, total_price, status } = req.body;

        OrderValidator.validateOrderPayload({
            user_id,
            cart_id,
            total_price,
            status,
        });
        const newOrder = await OrderService.createOrder(
            user_id,
            cart_id,
            total_price,
            status
        );
        return res.status(201).json({
            success: true,
            message: "Order berhasil dibuat!",
            data: newOrder,
        });
    } catch (error) {
        console.log("error :", error);
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
};