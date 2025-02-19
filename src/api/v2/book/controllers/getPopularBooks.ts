import { NextFunction, Request, Response } from "express";
import Book from "../../../../models/Book";
import { serverError } from "../../../../utils";

export const getPopularBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await Book.find()
      .populate({ path: "author", select: ["name"] })
      .populate({ path: "genre", select: ["title", "code"] })
      .sort([["download", -1]])
      .limit(5);

    res.status(200).json({
      code: 200,
      message: "Successfully retive data.",
      data: books,
    });
  } catch (error) {
    return next(serverError("An error occurred while retrieving books data."));
  }
};
