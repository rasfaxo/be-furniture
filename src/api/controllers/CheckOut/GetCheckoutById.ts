import { Request, Response } from "express";
import CheckoutService from "../../../libs/services/CheckOut";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getCheckoutById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const checkout = await CheckoutService.getCheckoutById(Number(id));

  if (!checkout) {
    throw new NotFoundError("Checkout not found!");
  }

  return res.status(200).json({
    success: true,
    message: "Checkout retrieved successfully",
    data: checkout,
  });
};