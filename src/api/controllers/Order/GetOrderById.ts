import { Request, Response } from "express";
import OrderService from "../../../libs/services/Order";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getOrderById = async (
    req: Request,
    res: Response
): Promise<Response> => {
   try {
    const { id } = req.params;
    const order = await OrderService.getOrderById(Number(id));

    if (!order) {
        throw new NotFoundError("Order tidak ditemukan");
    }

    return res.status(200).json({
        success: true,
        message: "Order ditemukan",
        data: order,
    });
   } catch (error) {
    if (error instanceof NotFoundError) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
    return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan pada server!",
    });
   }
}