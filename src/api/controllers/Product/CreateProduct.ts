import { Request, Response } from "express";
import ProductValidation from "../../../validation/Product";
import ProductService from "../../../libs/services/Product";
import categoryService from "../../../libs/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

interface ProductRequest extends Request {
  body: {
    name: string;
    description: string;
    price: number;
    stock: number;
    category_id: number;
    image_url: string;
  };
}

export const createProduct = async (
  req: ProductRequest,
  res: Response
): Promise<Response> => {
  const { name, description, price, stock, category_id, image_url } = req.body;
  ProductValidation.validateCreateProduct({
    name,
    description,
    price,
    stock,
    category_id,
    image_url,
  });

  const checkUniqueCategoryId =
    await categoryService.getCategoryById(category_id);

  if (!checkUniqueCategoryId) {
    throw new NotFoundError("Category id not found!");
  }

  const product = await ProductService.createProduct(
    name,
    description,
    price,
    stock,
    category_id,
    image_url
  );
  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};
