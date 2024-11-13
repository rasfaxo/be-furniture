import { Request, Response } from "express";
import cartService from "../../../libs/services/Cart";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const checkUniqueId = await cartService.getCartById(Number(id));
  if (!checkUniqueId) {
    throw new NotFoundError("Id not found");
  }
  await cartService.deleteCartById(Number(id));
  return res.status(200).json({
    success: true,
    message: "Successfully delete cart!",
  });
};
