import { Request, Response } from "express";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import mitraService from "../../../libs/services/Mitra";

export const getMitraById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await mitraService.getMitraById(Number(id));
  if (!result) {
    throw new NotFoundError("Id not found");
  }
  return res.status(200).json({
    status: "Successfully get mitra by id!",
    data: result,
  });
};

export default getMitraById;
