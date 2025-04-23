import { NextFunction, Request, Response } from "express";
import { PipelineStage } from "mongoose";
import Genre from "../../../../models/Genre";
import { QueryParams } from "../../../../types";
import { serverError } from "../../../../utils";

export const findAllGenresWithBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit = "10" }: QueryParams = req.query;
    const limitNum = parseInt(limit, 10);

    // Aggregation pipeline for fetching genres with a single book
    const aggregationPipeline: PipelineStage[] = [
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "genre",
          as: "book",
          pipeline: [{ $sort: { downloads: -1 } }, { $limit: 1 }],
        },
      },
      {
        $addFields: { totalBooks: { $size: "$book" } },
      },
      { $limit: limitNum },
      { $sort: { totalBooks: -1 } },
      {
        $project: {
          _id: 1,
          title: 1,
          code: 1,
          book: { _id: 1, title: 1, cover: 1 },
        },
      },
    ];

    const genreList = await Genre.aggregate(aggregationPipeline);

    res.json({
      code: 200,
      message: "Successfully retrieved data.",
      data: genreList,
    });
  } catch (error) {
    next(serverError("Something went wrong while finding genres."));
  }
};
