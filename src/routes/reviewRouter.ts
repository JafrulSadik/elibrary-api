import express from "express";
import { reviewController } from "../api/v1/review/inex";

const reviewRouter = express.Router();

reviewRouter.post("/:bookId/reviews", reviewController.createReview);
reviewRouter.get("/:bookId/reviews", reviewController.findAllReviewsForBook);
reviewRouter.delete("/reviews/:reviewId", reviewController.deleteReview);
reviewRouter.patch("/reviews/:reviewId", reviewController.updateReview);

export default reviewRouter;
