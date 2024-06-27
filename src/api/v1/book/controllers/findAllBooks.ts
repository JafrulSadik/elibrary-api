import { NextFunction, Request, Response } from "express";
import Book from "../../../../models/Book";
import { BookType } from "../../../../types";
import { serverError } from "../../../../utils";

export const findAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books: BookType[] = await Book.find();

    res.status(200).json({
      code: 200,
      message: "Successfully retive data.",
      data: books,
    });
  } catch (error) {
    return next(serverError("An error occurred while retrieving books data."));
  }
};
