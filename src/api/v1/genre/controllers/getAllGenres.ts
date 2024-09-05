import { NextFunction, Request, Response } from "express";
import Genre from "../../../../models/Genre";
import { QueryParams } from "../../../../types";
import { serverError } from "../../../../utils";

export const findAllGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    page,
    limit,
    sort_by,
    sort_type,
    search,
    genres = "",
  }: QueryParams = req.query;

  const genreCodes = genres?.split(",");
  const limitNum = limit ? parseInt(limit) : 10;

  try {
    const selectedGenre = await Genre.find({ code: genreCodes || "" });

    const otherGenres = await Genre.find({ code: { $nin: genreCodes } }).limit(
      limitNum
    );

    const allGenres = [...selectedGenre, ...otherGenres];

    const response = {
      code: 200,
      message: "Successfully retrive data.",
      data: allGenres,
    };

    res.json(response);
  } catch (error) {
    return next(serverError("Something went wrong while finding genres."));
  }
};
