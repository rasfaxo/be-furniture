import { Request, Response } from "express";
import CategoryValidation from "../../../validation/Category";
import categoryService from "../../../libs/services/Category";
import InvariantError from "../../../utils/exceptions/InvariantError";

interface CreateCategoryRequest extends Request {
    body: {
        name: string;
        description?: string;
    };
}

export const createCategory = async (
    req: CreateCategoryRequest,
    res: Response
): Promise<Response> => {
    const { name, description } = req.body;

    CategoryValidation.validateCategoryPayload({ name, description });

    const existingCategory = await categoryService.getCategoryByName(name);
    if (existingCategory) {
        throw new InvariantError("Kategori sudah ada");
    }

    const newCategory = await categoryService.createCategory(name, description);

    return res.status(201).json({
        success: true,
        message: "Kategori berhasil dibuat!",
        query: {
            id: newCategory.id,
            data: newCategory,
        },
    });
};
