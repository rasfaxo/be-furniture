import { Request, Response } from "express";
import userService from "../../../libs/services/Users";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const checkUniqueId = await userService.getUserById(Number(id));

  if (!checkUniqueId) {
    throw new NotFoundError("Id not found!");
  }

  await userService.deleteUserById(Number(id));

  return res.status(200).json({
    success: true,
    message: "Successfully deleted user!",
  });
};
