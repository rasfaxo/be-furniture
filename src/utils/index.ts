import { Request, Response, NextFunction } from "express";

export const catchAsync =
  (
    fn: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<Response | void>
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };

export const destImageLink = (path: string): string => {
  return path.split("\\").slice(-2).join("/");
};
