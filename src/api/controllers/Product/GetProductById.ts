import { Request, Response } from "express";
import productService from "../../../libs/services/Product";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productService.getProductById(Number(id));

  if (!product) {
    throw new NotFoundError("Product id not found!");
  }

  return res.status(200).json({
    status: "Successfully get product by id!",
    data: product,
  });
};
