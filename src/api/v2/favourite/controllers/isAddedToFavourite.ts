import { NextFunction, Request, Response } from "express";
import Book from "../../../../models/Book";
import Favourite from "../../../../models/Favourite";
import User from "../../../../models/User";
import { notFound, serverError } from "../../../../utils";

export const isAddedToFavourite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId, userId } = req.params;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return notFound("Book not found.");
    }

    const user = await User.findById(userId);
    if (!user) {
      return notFound("User not found.");
    }

    const favourite = await Favourite.findOne({ user: userId });

    if (!favourite) {
      return res.status(200).json({
        code: 200,
        message: "Successfully retrives data.",
        data: false,
      });
    }

    const response = {
      code: 200,
      message: "Successfully retrive data.",
      data: false,
    };

    if (favourite.books.toString().includes(bookId)) {
      response.data = true;
      return res.status(200).json(response);
    }

    if (favourite.books) res.status(200).json(response);
  } catch (error) {
    return next(serverError());
  }
};
