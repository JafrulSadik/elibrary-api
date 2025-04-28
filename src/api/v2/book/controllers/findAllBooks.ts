// import { NextFunction, Request, Response } from "express";
// import Book from "../../../../models/Book";
// import Genre from "../../../../models/Genre";
// import { QueryParams } from "../../../../types";
// import { paginationGen, serverError } from "../../../../utils";

// export const findAllBooks = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const {
//       page,
//       limit,
//       sort_by,
//       sort_type,
//       search,
//       genres = "",
//       authors = "",
//       ratings = "",
//     }: QueryParams = req.query;

//     const pageNum = page ? parseInt(page) : 1;
//     const limitNum = limit ? parseInt(limit) : 12;
//     const sortField = sort_by || "updatedAt";
//     const sortOrder = sort_type === "asc" ? 1 : -1;
//     const searchTerm = search || "";

//     const genreCodes = genres?.split(",");

//     const genreId = await Genre.find({ code: genreCodes || "" }).select("_id");
//     const transformGenreId = genreId.map((id) => {
//       return id._id.toString();
//     });

//     const authorsId = authors ? authors?.split(",") : [];
//     const starRatings = ratings ? ratings?.split(",") : [];
//     const stars = starRatings.map((rating) => parseInt(rating));

//     const searchFilter = {
//       title: {
//         $regex: searchTerm,
//         $options: "i",
//       },
//       ...(transformGenreId.length > 0 && { genre: { $in: transformGenreId } }),
//       ...(authorsId.length > 0 && { author: { $in: authorsId } }),
//       ...(stars.length > 0 && {
//         $expr: {
//           $in: [
//             {
//               $cond: {
//                 if: {
//                   $and: [
//                     { $gt: ["$numOfRating", 0] },
//                     { $gt: ["$totalRating", 0] },
//                   ],
//                 },
//                 then: { $floor: { $divide: ["$totalRating", "$numOfRating"] } },
//                 else: null,
//               },
//             },
//             stars,
//           ],
//         },
//       }),
//     };

//     const books = await Book.find(searchFilter)
//       .populate({ path: "author", select: ["name"] })
//       .populate({ path: "genre", select: ["title", "code"] })
//       .sort([[sortField, sortOrder]])
//       .skip(pageNum * limitNum - limitNum)
//       .limit(limitNum);

//     const bookNum = await Book.countDocuments(searchFilter);

//     const pagination = paginationGen({
//       totalItem: bookNum,
//       limit: limitNum,
//       currPage: pageNum,
//     });

//     res.status(200).json({
//       code: 200,
//       message: "Successfully retive data.",
//       data: books,
//       pagination,
//     });
//   } catch (error) {
//     return next(serverError("An error occurred while retrieving books data."));
//   }
// };

import { NextFunction, Request, Response } from "express";
import Book from "../../../../models/Book";
import Genre from "../../../../models/Genre";
import { QueryParams } from "../../../../types";
import { paginationGen, serverError } from "../../../../utils";

export const findAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page,
      limit,
      sort_by,
      sort_type,
      search,
      genres = "",
      authors = "",
      ratings = "",
    }: QueryParams = req.query;

    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 12;
    const sortOrder = sort_type === "asc" ? 1 : -1;
    const searchTerm = search || "";

    const genreCodes = genres?.split(",");
    const genreId = await Genre.find({ code: genreCodes || "" }).select("_id");
    const transformGenreId = genreId.map((id) => id._id.toString());

    const authorsId = authors ? authors?.split(",") : [];
    const starRatings = ratings ? ratings?.split(",") : [];
    const stars = starRatings.map((rating) => parseInt(rating));

    const searchFilter: any = {
      title: { $regex: searchTerm, $options: "i" },
      ...(transformGenreId.length > 0 && { genre: { $in: transformGenreId } }),
      ...(authorsId.length > 0 && { author: { $in: authorsId } }),
    };

    const pipeline: any[] = [
      { $match: searchFilter },
      {
        $addFields: {
          averageRating: {
            $cond: [
              { $gt: ["$numOfRating", 0] },
              { $divide: ["$totalRating", "$numOfRating"] },
              0,
            ],
          },
        },
      },
    ];

    if (stars.length > 0) {
      pipeline.push({
        $match: {
          $expr: {
            $in: [{ $floor: "$averageRating" }, stars],
          },
        },
      });
    }

    // Sorting
    if (sort_by === "ratings") {
      pipeline.push({
        $sort: { averageRating: sortOrder },
      });
    } else {
      pipeline.push({
        $sort: { [sort_by || "updatedAt"]: sortOrder },
      });
    }

    // Pagination
    pipeline.push({ $skip: (pageNum - 1) * limitNum });
    pipeline.push({ $limit: limitNum });

    // Lookup for populating author and genre
    pipeline.push(
      {
        $lookup: {
          from: "authors",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: { path: "$author", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "genres",
          localField: "genre",
          foreignField: "_id",
          as: "genre",
        },
      },
      { $unwind: { path: "$genre", preserveNullAndEmptyArrays: true } }
    );

    const books = await Book.aggregate(pipeline);

    const totalBooks = await Book.aggregate([
      { $match: searchFilter },
      {
        $addFields: {
          averageRating: {
            $cond: [
              { $gt: ["$numOfRating", 0] },
              { $divide: ["$totalRating", "$numOfRating"] },
              0,
            ],
          },
        },
      },
      ...(stars.length > 0
        ? [
            {
              $match: {
                $expr: {
                  $in: [{ $floor: "$averageRating" }, stars],
                },
              },
            },
          ]
        : []),
      { $count: "count" },
    ]);

    const pagination = paginationGen({
      totalItem: totalBooks[0]?.count || 0,
      limit: limitNum,
      currPage: pageNum,
    });

    res.status(200).json({
      code: 200,
      message: "Successfully retrieved data.",
      data: books,
      pagination,
    });
  } catch (error) {
    return next(serverError("An error occurred while retrieving books data."));
  }
};
