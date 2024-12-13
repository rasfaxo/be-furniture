import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import UserValidation from "../../../validation/Users";
import userService from "../../../libs/services/Users";
import InvariantError from "../../../utils/exceptions/InvariantError";
import { Role } from "@prisma/client";

dotenv.config();

const salt = bcrypt.genSaltSync(10);

interface CreateUserRequest extends Request {
  body: {
    name: string;
    email: string;
    phone_number: string;
    password: string;
    role: Role;
  };
}

export const createUsers = async (
  req: CreateUserRequest,
  res: Response
): Promise<Response> => {
  const {
    name,
    email,
    phone_number,
    password,
    role = Role.User,
  } = req.body;
  UserValidation.validatePayloadUser({
    name,
    email,
    phone_number,
    password,
  });

  const whereEmail = { email };
  const checkUniqueEmail = await userService.getUserByCredentials(whereEmail);
  if (checkUniqueEmail) {
    throw new InvariantError("Email already exists");
  }

  const wherePhone = { phone_number };
  const checkUniquePhoneNumber =
    await userService.getUserByCredentials(wherePhone);
  if (checkUniquePhoneNumber) {
    throw new InvariantError("Phone Number already exists");
  }

  const createUser = await userService.createUser(
    name,
    email,
    phone_number,
    bcrypt.hashSync(password, salt),
    role
  );

  const token = jwt.sign(
    {
      app_name: process.env.APP_NAME,
      id: createUser.id,
      email: createUser.email,
      phone_number: createUser.phone_number,
      name: createUser.name,
      role: createUser.role,
    },
    process.env.API_SECRET as string
  );

  return res.status(201).json({
    success: true,
    message: "Successfully created user!",
    token,
  });
};
