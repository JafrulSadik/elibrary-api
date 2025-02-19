import express from "express";
import { reviewController } from "../../api/v2/review/inex";
import { authenticate, authorize, reviewOwnership } from "../../middlewares/v2";

const reviewRouter = express.Router();

reviewRouter.post(
  "/:bookId/reviews",
  authenticate,
  authorize(["user", "admin"]),
  reviewController.createReview
);
reviewRouter.get("/:bookId/reviews", reviewController.findAllReviewsForBook);
reviewRouter.delete(
  "/:bookId/reviews/:reviewId",
  authenticate,
  authorize(["user", "admin"]),
  reviewOwnership,
  reviewController.deleteReview
);
reviewRouter.patch(
  "/:bookId/reviews/:reviewId",
  authenticate,
  authorize(["user"]),
  reviewOwnership,
  reviewController.updateReview
);

reviewRouter.get("/:bookId/review-count", reviewController.reviewCount);

export default reviewRouter;
