import { NextFunction, Request, Response } from "express";
import Book from "../../../../models/Book";
import Review from "../../../../models/Review";
import { notFound } from "../../../../utils";

export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reviewId, bookId } = req.params;
    const { comment, rating } = req.body;

    const review = await Review.findById({ _id: reviewId });
    const book = await Book.findById({ _id: bookId });

    if (!book) {
      return next(notFound("Book not found!"));
    }

    if (!review) {
      return next(notFound("Review not found."));
    }

    const updatedReview = await Review.findByIdAndUpdate(
      { _id: reviewId },
      {
        comment: comment || review.comment,
        rating: rating || review.rating,
      }
    );

    const bookRating = book.totalRating + (rating - review.rating);

    await Book.findByIdAndUpdate(
      { _id: bookId },
      {
        totalRating: bookRating,
      }
    );

    res.status(200).json({
      code: 200,
      massage: "Review updated successfully",
      data: updatedReview,
    });
  } catch (error) {}
};
