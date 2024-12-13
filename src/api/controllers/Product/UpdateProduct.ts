import { Request, Response } from "express";
import ProductService from "../../../libs/services/Product";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import ProductValidation from "../../../validation/Product";
import productService from "../../../libs/services/Product";
import categoryService from "../../../libs/services/Category";
import mitraService from "../../../libs/services/Mitra";

export const updateProductById = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  const { id, name, description, price, stock, category_id, mitra_id } =
    req.body;
  ProductValidation.validateUpdateProduct({
    id,
    name,
    description,
    price,
    stock,
    category_id,
    mitra_id,
  });
  const checkUniqueId = await ProductService.getProductById(Number(id));

  const checkUniqueCategoryId =
    await categoryService.getCategoryById(category_id);

  const checkUniqueMitraId = await mitraService.getMitraById(id);

  if (!checkUniqueId) {
    throw new NotFoundError("Id not found!");
  }

  if (!checkUniqueCategoryId) {
    throw new NotFoundError("Category id not found!");
  }

  if (!checkUniqueMitraId) {
    throw new NotFoundError("Mitra id not found!");
  }

  await productService.updateProductById(parseInt(id), {
    id,
    name,
    description,
    price,
    stock,
    category_id,
    mitra_id,
  });

  return res.status(200).json({
    success: true,
    message: "Successfully updated product!",
  });
};
