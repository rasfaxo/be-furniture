import { Request, Response } from "express";
import cartItemService from "../../../libs/services/CartItem";

interface Filter {
  id?: number;
  cart_id?: number;
  product_id?: number;
  quantitiy?: number;
  subtotal_price?: number;
}

interface GetCartItemsQery {
  page?: string;
  limit?: string;
}

interface GetCartsItemBody {
  filter?: Filter;
}

export const getCartItems = async (
  req: Request<{}, {}, GetCartsItemBody, GetCartItemsQery>,
  res: Response
): Promise<Response | any> => {
  const { page = "1", limit = "10" } = req.query;
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const { filter } = req.body;
  const skip = (pageNum - 1) * limitNum;
  const result = await cartItemService.getAllCartItem(skip, limitNum, filter);
  const conn = await cartItemService.countTotalDataCart();

  return res.status(200).json({
    succsess: true,
    current_page: pageNum,
    total_page: Math.ceil(conn / limitNum),
    total_data: conn,
    query: result,
  });
};
export default getCartItems;
