import { Request, Response } from "express";
import orderItemService from "../../../libs/services/OrderItem";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteOrderItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const existingOrderItem = await orderItemService.getOrderItemById(
      parseInt(id)
    );

    if (!existingOrderItem) {
      throw new NotFoundError("Order item tidak ditemukan");
    }

    await orderItemService.deleteOrderItemById(parseInt(id));

    return res.status(200).json({
      success: true,
      message: "Order item berhasil dihapus!",
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
