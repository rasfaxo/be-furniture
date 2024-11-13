import { Request, Response } from "express";
import cartService from "../../../libs/services/Cart";

interface Filter {
  id?: number;
  user_id?: number;
  total_price?: number;
}

interface GetCartsQuery {
  page?: string;
  limit?: string;
}

interface GetCartsBody {
  filter?: Filter;
}

export const getCarts = async (
  req: Request<{}, {}, GetCartsBody, GetCartsQuery>,
  res: Response
): Promise<Response | any> => {
  const { page = "1", limit = "10" } = req.query;

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const { filter } = req.body;

  const skip = (pageNum - 1) * limitNum;
  const result = await cartService.getAllCart(skip, limitNum, filter);
  const conn = await cartService.countTotalDataCart();

  return res.status(200).json({
    succsess: true,
    current_page: pageNum,
    total_page: Math.ceil(conn / limitNum),
    total_data: conn,
    query: result,
  });
};

export default getCarts;
