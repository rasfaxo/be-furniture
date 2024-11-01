import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cryptoJs from "crypto-js";
import AuthenticationError from "../../../utils/exceptions/AuthenticationError";
import userService from "../../../libs/services/Users";

dotenv.config();

export const authUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = req.headers.authorization;

  if (!token) {
    return next(new AuthenticationError("Token not found!"));
  }

  const bearer = token.split(" ")[1];
  const decToken = cryptoJs.AES.decrypt(
    bearer,
    process.env.API_SECRET as string
  ).toString(cryptoJs.enc.Utf8);

  let verify;
  try {
    verify = jwt.verify(decToken, process.env.API_SECRET as string) as {
      id: number;
      exp: number;
    };
  } catch (error) {
    return next(
      new AuthenticationError("Error! Failed to verify. Please login again.")
    );
  }

  if (
    !verify ||
    typeof verify.id !== "number" ||
    typeof verify.exp !== "number"
  ) {
    return next(new AuthenticationError("Invalid token payload."));
  }

  if (verify.exp < Date.now() / 1000) {
    return next(new AuthenticationError("Token expired!"));
  }

  const getUserData = await userService.getUserById(verify.id);

  if (!getUserData) {
    return next(new AuthenticationError("User not found!"));
  }

  const { password, ...userData } = getUserData;

  return res.status(200).json({
    success: true,
    query: userData,
  });
};
