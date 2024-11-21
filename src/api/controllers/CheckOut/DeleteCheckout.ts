import { Request, Response } from "express";
import CheckoutService from "../../../libs/services/CheckOut";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteCheckoutById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const checkUniqueId = await CheckoutService.getCheckoutById(Number(id));

  if (!checkUniqueId) {
    throw new NotFoundError("Checkout not found!");
  }

  await CheckoutService.deleteCheckoutById(Number(id));

  return res.status(200).json({
    success: true,
    message: "Checkout deleted successfully",
  });
};