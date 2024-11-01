import { Request, Response, NextFunction } from "express";
import cryptoJs from "crypto-js";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void | any> => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "Login terlebih dahulu untuk mendapatkan token!",
      });
    }

    // Decrypt the token
    const decryptedToken = cryptoJs.AES.decrypt(
      token.split(" ")[1],
      process.env.API_SECRET as string
    ).toString(cryptoJs.enc.Utf8);

    // Verify the JWT
    const verify = jwt.verify(
      decryptedToken,
      process.env.API_SECRET as string
    ) as jwt.JwtPayload;

    if (!verify) {
      return res.status(401).json({
        success: false,
        msg: "Login terlebih dahulu untuk mendapatkan token!",
      });
    }

    // Check token expiration
    if (verify.exp && verify.exp < Date.now() / 1000) {
      return res.status(401).json({
        success: false,
        msg: "Token Expired",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: "Login terlebih dahulu untuk mendapatkan token!",
    });
  }
};
