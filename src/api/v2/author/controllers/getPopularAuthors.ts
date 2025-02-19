import { NextFunction, Request, Response } from "express";
import User from "../../../../models/User";
import { serverError } from "../../../../utils";

type QueryType = {
  limit?: string;
};

export const getPopularAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit }: QueryType = req.query;

    const limitNum = limit ? parseInt(limit) : 10;

    const data = await User.aggregate([
      {
        // Lookup books written by each user
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "author",
          as: "books",
        },
      },
      {
        // Project the necessary fields
        $project: {
          _id: 1,
          name: 1,
          profileImg: 1,
          totalBooks: { $size: "$books" },
          totalDownloads: { $sum: "$books.downloads" },
        },
      },
      {
        // Sort by totalBooks in descending order
        $sort: {
          totalBooks: -1,
          totalDownloads: -1,
        },
      },
      {
        $limit: limitNum,
      },
    ]);

    const response = {
      code: 200,
      message: "Successfully retrive data.",
      data,
    };
    res.status(200).json(response);
  } catch (error) {
    return next(
      serverError("An error occured while retriving popular author data.")
    );
  }
};
