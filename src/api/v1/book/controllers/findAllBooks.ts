import { NextFunction, Request, Response } from "express";
import Book from "../../../../models/Book";
import { notFound, serverError } from "../../../../utils";

export const findAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await Book.find();

    if (!books) {
      return next(notFound("Users not found."));
    }

    res.status(200).json({
      code: 200,
      message: "Successfully retive data.",
      data: books,
    });
  } catch (error) {
    return next(serverError("Error occured while retriving users data."));
  }
};
