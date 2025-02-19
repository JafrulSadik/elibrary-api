import { NextFunction, Request, Response } from "express";
import { countReviews } from "../../../../lib/review";
import Review from "../../../../models/Review";
import { ReveiwType, ReviewQueryParams } from "../../../../types";
import { paginationGen, serverError } from "../../../../utils";

export const findAllReviewsForBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, sort_by, sort_type }: ReviewQueryParams = req.query;
    const { bookId } = req.params;

    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    const sortOrder = sort_type === "asc" ? 1 : -1;
    const sortField = sort_by || "updatedAt";

    const reviews: ReveiwType[] = await Review.find({ bookId })
      .populate({
        path: "authorId",
        select: ["name", "profileImg"],
      })
      .sort([[sortField, sortOrder]])
      .skip(pageNum * limitNum - limitNum)
      .limit(limitNum);

    const reviewNum = await countReviews(bookId);

    const pagination = paginationGen({
      totalItem: reviewNum,
      limit: limitNum,
      currPage: pageNum,
    });

    res.status(200).json({
      code: 200,
      message: "Successfully retive data.",
      data: reviews,
      pagination,
    });
  } catch (error) {
    return next(serverError("Error occured while finding reviews."));
  }
};
