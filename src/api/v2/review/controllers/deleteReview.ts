import { NextFunction, Request, Response } from "express";
import Book from "../../../../models/Book";
import Review from "../../../../models/Review";
import { notFound, serverError } from "../../../../utils";

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reviewId, bookId } = req.params;

  try {
    const review = await Review.findById({ _id: reviewId });

    if (!review) {
      return next(notFound("Review not found!"));
    }

    const book = await Book.findById({ _id: bookId });

    if (book) {
      const bookRating = book.totalRating - review.rating;
      const numOfRating = book.numOfRating - 1;
      await Book.findByIdAndUpdate(
        { _id: bookId },
        {
          totalRating: bookRating,
          numOfRating: numOfRating,
        }
      );
    }

    await Review.findByIdAndDelete({ _id: reviewId });
    res.sendStatus(204);
  } catch (error) {
    return next(serverError());
  }
};
