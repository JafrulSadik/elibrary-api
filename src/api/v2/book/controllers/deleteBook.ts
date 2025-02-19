import { NextFunction, Request, Response } from "express";
import Book from "../../../../models/Book";
import { notFound, serverError } from "../../../../utils";

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById({ _id: bookId });

    if (!book) {
      return next(notFound("Book not found!"));
    }

    await Book.findByIdAndDelete(bookId);

    res.status(204).json("Book deleted successfully.");
  } catch (error) {
    return next(
      serverError("An error occurred while trying to delete book data.")
    );
  }
};
