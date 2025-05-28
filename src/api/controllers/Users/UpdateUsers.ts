import { Request, Response } from "express";
import userService from "../../../libs/services/Users";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import UserValidation from "../../../validation/Users";

export const updateUsers = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  const { id, name, email, phone_number } = req.body;

  UserValidation.validateUpdateUser({
    id,
    name,
    email,
    phone_number,
  });

  const checkUniqueId = await userService.getUserById(parseInt(id));

  if (!checkUniqueId) {
    throw new NotFoundError("Id not found!");
  }

  await userService.updateUserById(parseInt(id), {
    id,
    name,
    email,
    phone_number,
  });

  return res.status(200).json({
    success: true,
    message: "Successfully updated user!",
  });
};
