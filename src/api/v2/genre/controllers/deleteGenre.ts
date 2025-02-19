import { NextFunction, Request, Response } from "express";
import Genre from "../../../../models/Genre";
import { badRequest, notFound } from "../../../../utils";

export const deleteGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { genreId } = req.params;

  try {
    const genre = await Genre.findById(genreId);

    if (!genre) {
      return next(notFound("Genre not found."));
    }

    await Genre.findByIdAndDelete(genreId);
    res.sendStatus(204);
  } catch (error) {
    next(badRequest("Something went wrong while deleting genre."));
  }
};
