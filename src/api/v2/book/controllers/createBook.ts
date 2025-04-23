import { NextFunction, Request, Response } from "express";
import Book from "../../../../models/Book";
import Genre from "../../../../models/Genre";
import { AuthRequest } from "../../../../types";
import { badRequest, notFound, serverError } from "../../../../utils";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, genreId, description, coverImageUrl, bookFileUrl } = req.body;

  const _req = req as AuthRequest;
  const user = _req.user;

  try {
    if (!title || !genreId || !description || !coverImageUrl || !bookFileUrl) {
      return next(badRequest("Invalid parameters."));
    }

    const genre = await Genre.findById(genreId);
    if (!genre) {
      return next(notFound("Genre not found."));
    }

    const book = new Book({
      title,
      description,
      genre: genreId,
      author: user.id,
      cover: coverImageUrl,
      file: bookFileUrl,
    });

    await book.save();

    return res.status(201).json({
      code: 201,
      message: "Ebook created successfully.",
      book: book,
    });
  } catch (error) {
    return next(serverError("Error occured while creating a book."));
  }
};
