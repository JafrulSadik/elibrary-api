import { NextFunction, Request, Response } from "express";
import Genre from "../../../../models/Genre";
import { badRequest, serverError } from "../../../../utils";

export const findByBooksByGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { genreId } = req.params;

  if (!genreId) {
    return next(badRequest("Invalid parameters."));
  }

  try {
    const genreExist = await Genre.findById({});
    res.json();
  } catch (error) {
    return next(serverError("Something went wrong while retriving books."));
  }
};
