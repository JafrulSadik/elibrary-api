import { NextFunction, Request, Response } from "express";
import Book from "../models/Book";
import { AuthRequest } from "../types";
import { authorizationError, notFound, serverError } from "../utils";

export const bookOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params;
  const book = await Book.findById({ _id: bookId });

  try {
    if (!book) {
      return next(notFound("Book not found."));
    }

    const _req = req as AuthRequest;

    if (book.author.toString() !== _req.user.id && _req.user.role !== "admin") {
      return next(authorizationError("You are not authorized."));
    }

    next();
  } catch (error) {
    return next(serverError());
  }
};
