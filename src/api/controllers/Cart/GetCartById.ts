import { Request, Response } from "express";
import cartService from "../../../libs/services/Cart";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getCartById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await cartService.getCartById(Number(id));

  if (!result) {
    throw new NotFoundError("Cart id not found!");
  }

  return res.status(200).json({
    status: "Succsessfully get cart by id!",
    data: result,
  });
};
