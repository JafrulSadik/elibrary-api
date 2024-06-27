import { NextFunction, Request, Response } from "express";
import Review from "../../../../models/Review";
import { notFound, serverError } from "../../../../utils";

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findById({ _id: reviewId });

    if (!review) {
      return next(notFound("Review not found!"));
    }
    await Review.findByIdAndDelete({ _id: reviewId });
    res.sendStatus(204);
  } catch (error) {
    return next(serverError());
  }
};
