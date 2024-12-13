import { Request, Response, NextFunction } from "express";

const checkRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      res.status(403).json({
        success: false,
        message: "Anda tidak memiliki hak akses untuk fitur ini!",
      });
      return;
    }
    next();
  };
};

export default checkRole;
