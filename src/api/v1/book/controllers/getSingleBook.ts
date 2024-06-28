import { NextFunction, Request, Response } from "express";
import Book from "../../../../models/Book";
import { notFound, serverError } from "../../../../utils";

export const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById({ _id: bookId }).populate({
      path: "author",
      select: "name",
    });

    if (!book) {
      return next(notFound("Book not found."));
    }

    res.status(200).json({
      code: 200,
      message: "Successfully retive data.",
      data: book,
    });
  } catch (error) {
    return next(serverError("Error occured while retriving book data."));
  }
};
