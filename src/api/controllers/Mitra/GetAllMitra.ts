import { Request, Response } from "express";
import mitraService from "../../../libs/services/Mitra";

interface Filter {
  id?: number;
  user_id?: number;
  company_name?: string;
  business_type?: string;
  address?: string;
  contact_info?: string;
}

interface GetMitraQuery {
  page?: string;
  limit?: string;
}

interface GetMitraBody {
  filter?: Filter;
}

export const getMitras = async (
  req: Request<{}, {}, GetMitraBody, GetMitraQuery>,
  res: Response
): Promise<Response | any> => {
  const { page = "1", limit = "10" } = req.query;
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const { filter } = req.body;
  const skip = (pageNum - 1) * limitNum;
  const result = await mitraService.getMitras(skip, limitNum, filter);
  const conn = await mitraService.countTotalDataMitra();

  return res.status(200).json({
    succsess: true,
    current_page: pageNum,
    total_page: Math.ceil(conn / limitNum),
    total_data: conn,
    query: result,
  });
};
export default getMitras;
