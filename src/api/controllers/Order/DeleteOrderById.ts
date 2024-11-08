import { Request, Response } from "express";
import OrderService from "../../../libs/services/Order";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteOrderByid = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const existingOrder = await OrderService.getOrderById(parseInt(id));

    if (!existingOrder) {
      throw new NotFoundError("Id order tidak ditemukan!");
    }

    const order = await OrderService.deleteOrderById(parseInt(id));
    return res.status(200).json({
      success: true,
      message: "Order berhasil dihapus!",
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
      message: "Internal server error",
    });
  }
};
