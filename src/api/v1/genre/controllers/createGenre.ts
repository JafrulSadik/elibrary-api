import { NextFunction, Request, Response } from "express";
import Genre from "../../../../models/Genre";
import { badRequest, duplicateError, serverError } from "../../../../utils";

export const createGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title } = req.body;

  if (!title) {
    return next(badRequest("Invalid parameters."));
  }

  try {
    const exist = await Genre.find({ title });

    if (exist.length) {
      return next(duplicateError("Already have an book with this title."));
    }

    const genre = new Genre({ title });
    await genre.save();

    const response = {
      code: 200,
      message: "Genre successfully created.",
      data: genre,
    };

    res.json(response);
  } catch (error) {
    return next(serverError("Something went wrong while creating a category."));
  }
};
