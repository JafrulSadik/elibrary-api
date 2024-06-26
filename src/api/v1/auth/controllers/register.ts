import { NextFunction, Request, Response } from "express";
import { generateToken } from "../../../../lib/token";
import { userExist } from "../../../../lib/user";
import User from "../../../../models/User";
import { badRequest, hashFunction, serverError } from "../../../../utils";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, role = "user", status = "public" } = req.body;

  if (!name || !email || !password) {
    return next(badRequest("All the fields are required."));
  }

  try {
    //   Check existing user
    const user = await userExist(email);

    if (user) {
      return res
        .status(200)
        .json("The email address is already in use. Please try to login.");
    }

    const hashedPassword = await hashFunction.generateHash(password);
    if (!hashedPassword) {
      return next(badRequest("Error occured while hashing password."));
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      status,
    });

    await newUser.save();

    const payload = {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    };

    const accessToken = generateToken(payload);

    res.status(201).json({
      code: 201,
      message: "SignUp successfull.",
      data: {
        accessToken: accessToken,
      },
      link: {
        self: `/users/${newUser._id}`,
        signin: `/auth/signin`,
      },
    });
  } catch (error) {
    next(serverError("Error occured while creating user."));
  }
};
