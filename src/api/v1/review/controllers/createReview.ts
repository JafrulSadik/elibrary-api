import { NextFunction, Request, Response } from "express";
import Review from "../../../../models/Review";
import { AuthRequest } from "../../../../types";
import { notFound, serverError } from "../../../../utils";
import { bookExist } from "./../../../../lib/book/index";

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { rating, comment } = req.body;
  const _req = req as AuthRequest;
  const authorId = _req.user.id;
  const { bookId } = req.params;

  try {
    const book = await bookExist(bookId);
    if (!book) {
      return next(notFound("Book not found!"));
    }

    const reviewCount = await Review.find({
      bookId,
      authorId,
    }).countDocuments();

    if (reviewCount) {
      return res.status(200).json({
        code: 200,
        message: "You have already reviewed this item.",
      });
    }

    const review = new Review({
      bookId,
      authorId,
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
