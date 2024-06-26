import { NextFunction, Request, Response } from "express";
import User from "../../../../models/User";
import { notFound, serverError } from "../../../../utils";

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const user = await User.findById({ _id: userId }).select([
      "-__v",
      "-password",
    ]);

    if (!user) {
      return next(notFound("User not found."));
    }

    res.status(200).json({
      code: 200,
      message: "Successfully retive data.",
      data: user,
    });
  } catch (error) {
    return next(serverError("Error occured while retriving user data."));
  }
};
