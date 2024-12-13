import { Request, Response, NextFunction, RequestHandler } from "express";
import cryptojs from "crypto-js";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authCheck: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Login terlebih dahulu untuk mendapatkan token!",
      });
      return;
    }

    const decryptedToken = cryptojs.AES.decrypt(
      token.split(" ")[1],
      process.env.API_SECRET as string
    ).toString(cryptojs.enc.Utf8);

    const verify = jwt.verify(
      decryptedToken,
      process.env.API_SECRET as string
    ) as JwtPayload;

    if (!verify) {
      res.status(401).json({
        success: false,
        message: "Token tidak valid!",
      });
      return;
    }

    req.user = verify;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Terjadi kesalahan, silakan login ulang!",
    });
    return;
  }
};
