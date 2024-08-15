import { NextFunction, Request, Response } from "express";
import Genre from "../../../../models/Genre";
import { serverError } from "../../../../utils";

export const findAllGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const genres = await Genre.find();

    const response = {
      code: 200,
      message: "Successfully retrive data.",
      data: genres,
    };

    res.json(response);
  } catch (error) {
    return next(serverError("Something went wrong while finding genres."));
  }
};
