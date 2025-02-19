import { NextFunction, Request, Response } from "express";
import User from "../../../../models/User";
import { AuthRequest } from "../../../../types";
import { notFound, serverError } from "../../../../utils";

export const updateUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, about, profileImgUrl } = req.body;

  try {
    const _req = req as AuthRequest;
    const user = await User.findById(_req.user.id);

    if (!user) {
      return next(notFound("User not found."));
    }

    await User.findByIdAndUpdate(_req.user.id, {
      name: name || user.name,
      about: about,
      profileImg: profileImgUrl ? profileImgUrl : user.profileImg,
    });

    const updatedUser = await User.findById(_req.user.id);

    const response = {
      code: 200,
      message: "Successfully update user's data.",
      data: {
        id: updatedUser?._id,
        name: updatedUser?.name,
        email: updatedUser?.email,
        role: updatedUser?.role,
        about: updatedUser?.about,
        profileImg: updatedUser?.profileImg,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.log({ error });
    return next(serverError("An error occurred while retrieving books data."));
  }
};
