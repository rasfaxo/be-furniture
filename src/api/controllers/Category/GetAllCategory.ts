import { Request, Response } from "express";
import categoryService from "../../../libs/services/Category";

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const categories = await categoryService.getAllCategories();

    return res.status(200).json({
      success: true,
      message: "Daftar kategori berhasil diambil",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
