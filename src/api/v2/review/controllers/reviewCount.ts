import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Review from "../../../../models/Review";
import { serverError } from "../../../../utils";

export const reviewCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params;

  try {
    const reviews = await Review.aggregate([
      {
        $match: { bookId: new mongoose.Types.ObjectId(bookId) },
      },
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);

    const response = {
      code: 200,
      message: "Successfully retrive data.",
      data: reviews,
    };

    res.status(200).json(response);
  } catch (error) {
    return serverError("Failed to retrive data.");
  }
};
