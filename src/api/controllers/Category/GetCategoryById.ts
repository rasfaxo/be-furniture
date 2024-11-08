import { Request, Response } from "express";
import categoryService from "../../../libs/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const category = await categoryService.getCategoryById(Number(id));

    if (!category) {
      throw new NotFoundError("Kategori tidak ditemukan");
    }

    return res.status(200).json({
      success: true,
      message: "Kategori ditemukan",
      data: category,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
