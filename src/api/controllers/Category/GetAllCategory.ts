import { Request, Response } from "express";
import categoryService from "../../../libs/services/Category";

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const result = await categoryService.getAllCategories();
  return res.status(200).json({
    success: true,
    message: "Successfully get all categories!",
    query: result,
  });
};
