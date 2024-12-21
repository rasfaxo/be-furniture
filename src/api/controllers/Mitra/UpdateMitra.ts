import { Request, Response } from "express";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import mitraService from "../../../libs/services/Mitra";
import userService from "../../../libs/services/Users";
import MitraValidation from "../../../validation/Mitra";

export const UpdateMitra = async (req: Request, res: Response) => {
  const { id, user_id, company_name, business_type, contact_info } = req.body;

  MitraValidation.validateUpdateMitra({
    id,
    user_id,
    company_name,
    business_type,
    contact_info,
  });

  const checkUniqueId = await mitraService.getMitraById(id);

  if (!checkUniqueId) {
    throw new NotFoundError("Id not found!");
  }

  const checkUserId = await userService.getUserById(user_id);

  if (!checkUserId) {
    throw new NotFoundError("Mitra id not found!");
  }

  await mitraService.updateMitraById(parseInt(id), {
    id,
    user_id,
    company_name,
    business_type,
    contact_info,
  });
  return res.status(200).json({
    status: true,
    message: "Successfully updated mitra!",
  });
};
