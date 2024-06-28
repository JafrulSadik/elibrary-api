import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config/config";
import { AuthRequest } from "../types";
import { authenticationError } from "../utils";

type DecodeOuputType = {
  id: string;
  role: string;
  email: string;
};

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return next(authenticationError("Authorization token is required."));
    }

    const parsedToken = token.split(" ").at(-1) || "";

    const decode = verify(
      parsedToken,
      config.jwtSecret as string
    ) as DecodeOuputType;

    const user = {
      id: decode.id,
      role: decode.role,
      email: decode.email,
    };

    const _req = req as AuthRequest;
    _req.user = user;

    next();
  } catch (error) {
    return next(authenticationError());
  }
};
