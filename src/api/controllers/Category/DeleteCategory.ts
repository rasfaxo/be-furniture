import { Request, Response } from "express";
import categoryService from "../../../libs/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const existingCategory = await categoryService.getCategoryById(Number(id));

    if (!existingCategory) {
      throw new NotFoundError("Kategori tidak ditemukan!");
    }

    await categoryService.deleteCategory(Number(id));

    return res.status(200).json({
      success: true,
      message: "Kategori berhasil dihapus!",
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
