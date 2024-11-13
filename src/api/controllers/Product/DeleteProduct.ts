import { Request, Response } from "express";
import ProductService from "../../../libs/services/Product";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const checkUniqueId = await ProductService.getProductById(Number(id));

  if (!checkUniqueId) {
    throw new NotFoundError("Id not found!");
  }
  await ProductService.deleteProductById(Number(id));
  return res.status(200).json({
    success: true,
    message: "Successfully deleted product!",
  });
};
