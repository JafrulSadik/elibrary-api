import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types";
import { authorizationError } from "../utils";

export const authorize =
  (roles: string[] = []) =>
  (req: Request, res: Response, next: NextFunction) => {
    const _req = req as AuthRequest;
    const roleExist = roles.includes(_req.user.role);

    if (!roleExist) {
      return next(authorizationError());
    }
    next();
  };
