import { NextFunction, Request, Response } from "express";
import User from "../../../../models/User";
import { notFound, serverError } from "../../../../utils";

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().select(["-__v", "-password"]);

    if (!users) {
      return next(notFound("Users not found."));
    }

    res.status(200).json({
      code: 200,
      message: "Successfully retive data.",
      data: users,
    });
  } catch (error) {
    return next(serverError("Error occured while retriving users data."));
  }
};
