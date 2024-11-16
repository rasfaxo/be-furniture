import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import userService from "../../../libs/services/Users";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import ClientError from "../../../utils/exceptions/ClientError";
import UserValidation from "../../../validation/Users";

const salt = bcrypt.genSaltSync(10);

export const changePasswordUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, phone_number, oldPassword, newPassword } = req.body as {
    email?: string;
    phone_number?: string;
    oldPassword: string;
    newPassword: string;
  };

  const where: { email?: string; phone_number?: string } = {};
  if (email) {
    UserValidation.validateChangePassword({ email, oldPassword, newPassword });
    where.email = email;
  } else if (phone_number) {
    UserValidation.validateChangePassword({
      phone_number,
      oldPassword,
      newPassword,
    });
    where.phone_number = phone_number;
  } else {
    throw new ClientError("Email or Phone Number is required");
  }

  const findUsers = await userService.getUserByCredentials(where);

  if (!findUsers) {
    throw new NotFoundError(
      `${where.email ? "Email" : "Phone Number"} not found!`
    );
  }

  const compareOldPassword = bcrypt.compareSync(
    oldPassword,
    findUsers.password
  );
  if (!compareOldPassword) {
    throw new ClientError("Incorrect old password");
  }

  const hashNewPassword = bcrypt.hashSync(newPassword, salt);
  await userService.changePassword(findUsers.id, hashNewPassword);

  res.status(200).json({
    success: true,
    msg: "Successfully changed password!",
  });
};
