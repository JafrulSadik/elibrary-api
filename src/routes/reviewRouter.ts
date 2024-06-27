import express from "express";
import { reviewController } from "../api/v1/review/inex";

const reviewRouter = express.Router();

reviewRouter.post("/", reviewController.addReview);

export default reviewRouter;
