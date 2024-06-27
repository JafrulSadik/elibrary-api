import { NextFunction, Request, Response } from "express";
import Review from "../../../../models/Review";
import { notFound, serverError } from "../../../../utils";
import { bookExist } from "./../../../../lib/book/index";

export const addReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, bookId, rating, comment } = req.body;

  try {
    const book = await bookExist(bookId);
    console.log("not ok");
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
