import { Request, Response } from "express";
import categoryService from "../../../libs/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const category = await categoryService.getCategoryById(Number(id));

  if (!category) {
    throw new NotFoundError("Category id not found!");
  }

  return res.status(200).json({
    success: true,
    message: "Successfully get category by id!",
    data: category,
  });
};
