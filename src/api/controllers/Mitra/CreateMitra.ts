import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import MitraValidation from "../../../validation/Mitra";
import mitraService from "../../../libs/services/Mitra";
import InvariantError from "../../../utils/exceptions/InvariantError";
import userService from "../../../libs/services/Users";

dotenv.config();

bcrypt.genSaltSync(10);

interface CreateMitraRequest extends Request {
  body: {
    user_id: number;
    company_name: string;
    business_type: string;
    address: string;
    contact_info: string;
  };
}

export const createMitra = async (
  req: CreateMitraRequest,
  res: Response
): Promise<Response> => {
  const { user_id, company_name, business_type, address, contact_info } =
    req.body;

  MitraValidation.validatePayloadMitra({
    user_id,
    company_name,
    business_type,
    address,
    contact_info,
  });

  const checkUniqueUserId = await userService.getUserById(user_id);
  if (!checkUniqueUserId) {
    throw new InvariantError("User id not found!");
  }

  await mitraService.createMitra(
    user_id,
    company_name,
    business_type,
    address,
    contact_info
  );

  return res.status(201).json({
    success: true,
    message: "Successfully create mitra!",
  });
};
