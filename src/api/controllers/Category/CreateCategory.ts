import { Request, Response } from "express";
import { Category_name } from "@prisma/client";
import CategoryValidation from "../../../validation/Category";
import categoryService from "../../../libs/services/Category";
import InvariantError from "../../../utils/exceptions/InvariantError";

interface CreateCategoryRequest extends Request {
    body: {
        category_name: Category_name;
    };
}

export const createCategory = async (
    req: CreateCategoryRequest,
    res: Response
): Promise<Response> => {
   try {
     const { category_name } = req.body;
 
     CategoryValidation.validateCategoryPayload({ category_name });
 
     const existingCategory = await categoryService.getCategoryByName(category_name);
     if (existingCategory) {
         throw new InvariantError("Kategori sudah ada");
     }
 
     const newCategory = await categoryService.createCategory(category_name);
 
     return res.status(200).json({
         success: true,
         message: "Kategori berhasil dibuat!",
         query: {
             id: newCategory.id,
             data: newCategory,
         },
     });
   } catch (error) {
    if (error instanceof InvariantError) {
        return res.status(400).json({
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
