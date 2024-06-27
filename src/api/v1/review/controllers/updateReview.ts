import { NextFunction, Request, Response } from "express";
import Review from "../../../../models/Review";
import { notFound } from "../../../../utils";

export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reviewId } = req.params;
    const { comment, rating } = req.body;

    const review = await Review.findById({ _id: reviewId });

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

    res.status(200).json({
      code: 200,
      massage: "Review updated successfully",
      data: updatedReview,
    });
  } catch (error) {}
};
