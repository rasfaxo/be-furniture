import { Request, Response } from "express";
import ProductService from "../../../libs/services/Product";

interface Filter {
    id?: number,
    name?: string,
    description?: string,
    price?: number,
    stock?: number,
    category_id?: number
}

interface GetProductsQuery {
    page?: string,
    limit?: string
}

interface GetProductBody{
    filter?: Filter
}

export const getProducts = async  (
    req: Request<{}, {}, GetProductBody, GetProductsQuery>,
    res: Response
): Promise<Response | any> => {
    // Mengambil query params dengan default jika tidak ada yang dikirim
    const { page = "1", limit = "10" } = req.query;

    // Mengonversi page dan limit ke number
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const {filter} = req.body

    // Menghitung jumlah item yang harus dilewati
    const skip = (pageNum - 1) * limitNum;

    // Mengambil produk berdasarkan filter dan pagination
    const result = await ProductService.getAllProduct(skip, limitNum, filter);
    const conn = await ProductService.countTotalDataProduct();

    return res.status(200).json({
        success: true,
        current_page: pageNum,
        total_page: Math.ceil(conn / limitNum),
        total_data: conn,
        query: result,
    });
}
