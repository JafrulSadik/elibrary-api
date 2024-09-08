import { NextFunction, Request, Response } from "express";
import path from "path";
import cloudinary from "../../../../config/cloudinary";
import User from "../../../../models/User";
import { AuthRequest } from "../../../../types";
import { notFound, removeFile, serverError } from "../../../../utils";

export const updateUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, about } = req.body;

  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const _req = req as AuthRequest;
    const user = await User.findById(_req.user.id);

    if (!user) {
      if (files["profileImg"]) {
        await removeFile(files["profileImg"][0]);
      }
      return next(notFound("User not found."));
    }

    let profileImgUploadResult;

    if (files["profileImg"]) {
      const profileImgMimeType = files["profileImg"][0].mimetype
        .split("/")
        .at(-1);
      const profileImgName = files["profileImg"][0].filename;
      const profileImgPath = path.resolve(
        __dirname,
        "../../../../../public/data/uploads",
        files["profileImg"][0].filename
      );

      profileImgUploadResult = await cloudinary.uploader.upload(
        profileImgPath,
        {
          filename_override: profileImgName,
          folder: "/elibrary/profile-img",
          format: profileImgMimeType,
        }
      );

      if (user.profileImg) {
        const profileImgUrl = user.profileImg;
        const splitUrl = profileImgUrl.split("/");
        //   Generate public id form url
        const publicId =
          splitUrl.at(-3) +
          "/" +
          splitUrl.at(-2) +
          "/" +
          splitUrl.at(-1)?.split(".").at(-2);
        try {
          await cloudinary.api.delete_resources([publicId]);
        } catch (error) {
          return next(serverError("Removing file form cloudinary failed"));
        }
      }

      await removeFile(files["profileImg"][0]);
    }

    await User.findByIdAndUpdate(_req.user.id, {
      name: name || user.name,
      about: about,
      profileImg: profileImgUploadResult
        ? profileImgUploadResult.secure_url
        : user.profileImg,
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
