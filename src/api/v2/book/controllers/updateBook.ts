import { NextFunction, Request, Response } from "express";
import Book from "../../../../models/Book";
import { notFound, serverError } from "../../../../utils";

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, genre, description, bookId, bookFileUrl, coverImageUrl } =
    req.body;

  if (
    !title ||
    !genre ||
    !description ||
    !bookId ||
    !bookFileUrl ||
    !coverImageUrl
  ) {
    return next(notFound("Invalid peremeters."));
  }

  try {
    const book = await Book.findById({ _id: bookId });

    if (!book) {
      return next(notFound("Book not found!"));
    }

    res.status(200).json({
      code: 200,
      message: "Ebook updated successfully.",
      data: updateBook,
    });
  } catch (error) {
    return next(serverError("There was a problem updating the book"));
  }
};
