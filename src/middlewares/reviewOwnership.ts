import { NextFunction, Request, Response } from "express";
import Review from "../models/Review";
import { AuthRequest } from "../types";
import { authorizationError, notFound, serverError } from "../utils";

export const reviewOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reviewId } = req.params;
  const review = await Review.findById({ _id: reviewId });

  try {
    if (!review) {
      return next(notFound("Review not found."));
    }

    const _req = req as AuthRequest;

    if (
      review.authorId.toString() !== _req.user.id &&
      _req.user.role !== "admin"
    ) {
      return next(
        authorizationError("Permission denied. You are not authorized.")
      );
    }

    next();
  } catch (error) {
    return next(serverError());
  }
};
