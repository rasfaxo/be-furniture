import { Request, Response } from "express";
import cartItemService from "../../../libs/services/CartItem";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getCartItemById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await cartItemService.getCartItemById(Number(id));

  if (!result) {
    throw new NotFoundError("Id not found");
  }

  return res.status(200).json({
    status: "Successfully get cart item by id!",
    data: result,
  });
};

export default getCartItemById;
