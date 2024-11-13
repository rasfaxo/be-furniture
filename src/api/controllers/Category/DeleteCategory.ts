import { Request, Response } from "express";
import categoryService from "../../../libs/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const checkUniqueId = await categoryService.getCategoryById(Number(id));
  if (!checkUniqueId) {
    throw new NotFoundError("Category id not found!");
  }
  await categoryService.deleteCategory(Number(id));
  return res.status(200).json({
    success: true,
    message: "Successfully delete category!",
  });
};
