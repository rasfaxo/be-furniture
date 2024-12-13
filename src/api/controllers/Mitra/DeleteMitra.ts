import { Request, Response } from "express";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import mitraService from "../../../libs/services/Mitra";

export const deleteMitra = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const checkUniqueId = await mitraService.getMitraById(Number(id));
  if (!checkUniqueId) {
    throw new NotFoundError("Id not found!");
  }
  await mitraService.deleteMitraById(Number(id));
  return res.status(200).json({
    success: true,
    message: "Successfully delete mitra!",
  });
};
