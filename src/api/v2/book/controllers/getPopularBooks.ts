import { NextFunction, Request, Response } from "express";
import Book from "../../../../models/Book";
import { QueryParams } from "../../../../types";
import { serverError } from "../../../../utils";

export const getPopularBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { limit }: QueryParams = req.query;

  const limitNum = limit ? parseInt(limit) : 5;

  try {
    const books = await Book.find()
      .populate({ path: "author", select: ["name"] })
      .populate({ path: "genre", select: ["title", "code"] })
      .sort([["download", -1]])
      .limit(limitNum);

    res.status(200).json({
      code: 200,
      message: "Successfully retive data.",
      data: books,
    });
  } catch (error) {
    return next(serverError("An error occurred while retrieving books data."));
  }
};
