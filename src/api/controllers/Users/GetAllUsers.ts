import { Request, Response } from "express";
import userService from "../../../libs/services/Users";

interface Filter {
  id?: number;
  username?: string;
  email?: string;
}

interface GetUsersBody {
  filter?: Filter;
}

interface GetUsersQuery {
  page?: string;
  limit?: string;
}

export const getUsers = async (
  req: Request<{}, {}, GetUsersBody, GetUsersQuery>,
  res: Response
): Promise<Response | any> => {
  const { page = "1", limit = "10" } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;
  const { filter } = req.body;

  const result = await userService.getUsers(skip, limitNum, filter);
  const conn = await userService.countTotalDataUser();

  const sanitizedResult = result.map((user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  return res.status(200).json({
    success: true,
    current_page: pageNum,
    total_page: Math.ceil(conn / limitNum),
    total_data: conn,
    query: sanitizedResult,
  });
};
