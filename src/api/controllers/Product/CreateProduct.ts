import { Request, Response } from "express";
import ProductValidation from "../../../validation/Product";
import ProductService from "../../../libs/services/Product";


interface ProductRequest extends Request {
    body: {
        name: string;
        description: string;
        price: number;
        stock: number;
        category_id: number;
    };
}

export const createProduct = async (
    req: ProductRequest,
    res: Response
): Promise<Response> => {
    const { name, description, price, stock, category_id } = req.body;
     ProductValidation.validateCreateProduct({
        name,
        description,
        price,
        stock,
        category_id
     }); 

    const product = await ProductService.createProduct(
        name,
        description,
        price,
        stock,
        category_id
    );
    return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
    });
}