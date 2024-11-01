import { Request, Response } from "express";
import userService from "../../../libs/services/Users";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await userService.getUserById(Number(id));

  if (!user) {
    throw new NotFoundError(
      "Pengguna tidak ditemukan, silakan masukkan ID yang benar."
    );
  }

  return res.status(200).json({ status: "success", data: user });
};
