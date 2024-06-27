import express from "express";
import { reviewController } from "../api/v1/review/inex";

const reviewRouter = express.Router();

reviewRouter.post("/:bookId/review", reviewController.createReview);
reviewRouter.get("/:bookId/review", reviewController.findAllReviewsForBook);
reviewRouter.delete("/:bookId/review/:reviewId", reviewController.deleteReview);

export default reviewRouter;
