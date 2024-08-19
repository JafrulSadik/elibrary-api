import { NextFunction, Request, Response } from "express";
import Book from "../../../../models/Book";
import Favourite from "../../../../models/Favourite";
import User from "../../../../models/User";
import { notFound, serverError } from "../../../../utils";

export const addToFavourite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, bookId } = req.body;

  console.log({ userId, bookId });
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(notFound("User not found!"));
    }

    const bookExist = await Book.findById(bookId);
    if (!bookExist) {
      return next(notFound("Book not found!"));
    }

    let favourite = await Favourite.findOne({ user: userId });

    if (!favourite) {
      favourite = new Favourite({
        user: userId,
        books: [],
      });

      favourite.books.push(bookId);
      await favourite.save();
    } else {
      if (favourite.books.includes(bookId)) {
        await Favourite.findOneAndUpdate(
          { user: userId },
          {
            $pull: {
              books: bookId,
            },
          }
        );
      } else {
        favourite.books.push(bookId);
        await favourite.save();
      }
    }

    console.log(favourite);

    const response = {
      code: 200,
      message: "Book added to favourite.",
    };

    res.status(200).json(response);
  } catch (error) {
    return next(serverError());
  }
};
