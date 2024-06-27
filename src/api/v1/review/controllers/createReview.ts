import { NextFunction, Request, Response } from "express";
import Review from "../../../../models/Review";
import { notFound, serverError } from "../../../../utils";
import { bookExist } from "./../../../../lib/book/index";

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, rating, comment } = req.body;
  const { bookId } = req.params;

  try {
    const book = await bookExist(bookId);
    if (!book) {
      return next(notFound("Book not found!"));
    }
    const review = new Review({
      bookId,
      userId,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({
      code: 201,
      message: "Review added successfully.",
      data: review,
    });
  } catch (error) {
    return next(serverError("Something went wrong. Review failed."));
  }
};
