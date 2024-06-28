import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import config from "../../../../config/config";
import User from "../../../../models/User";
import {
  authenticationError,
  badRequest,
  serverError,
} from "../../../../utils";
import { compareHash } from "../../../../utils/hashing";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(badRequest("Invalid parameters"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(authenticationError("User name or password doesn't match."));
    }

    const verifyUser = await compareHash({ password, hash: user.password });
    if (!verifyUser) {
      return next(badRequest("User name or password doesn't match."));
    }

    const token = sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      config.jwtSecret as string,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      code: 200,
      message: "Login successfully.",
      data: {
        accessToken: token,
      },
      links: {
        self: `/users/${user._id}`,
      },
    });
  } catch (error) {
    return next(serverError("Error occured while login."));
  }
};
