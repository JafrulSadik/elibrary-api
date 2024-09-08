import { NextFunction, Request, Response } from "express";
import User from "../../../../models/User";
import { notFound, serverError } from "../../../../utils";
import { AuthRequest } from "./../../../../types/Auth";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _res = req as AuthRequest;

  try {
    const user = await User.findById(_res.user.id).select([
      "-password",
      "-role",
    ]);

    if (!user) {
      return next(notFound("User not found."));
    }

    const response = {
      code: 200,
      message: "User data retrive successfully.",
      data: user,
    };

    res.status(200).json(response);
  } catch (error) {
    return next(serverError());
  }
};
