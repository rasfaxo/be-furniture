import { Request, Response } from "express";
import categoryService from "../../../libs/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import CategoryValidation from "../../../validation/Category";

export const updateCategory = async (
    req: Request,
    res: Response
) => {
    const { id, category_name } = req.body;

    CategoryValidation.validateUpdateCategory({ id, category_name });

    const existingCategory = await categoryService.getCategoryById(parseInt(id));

    if (!existingCategory) {
        throw new NotFoundError("Kategori tidak ditemukan");
    }

    const updateCategory = await categoryService.updateCategory(parseInt(id), {
        category_name,
    });

    return res.status(200).json({
        success: true,
        message: "Kategori berhasil diubah",
        data: updateCategory,
    });
};
