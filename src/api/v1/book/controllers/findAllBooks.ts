import { NextFunction, Request, Response } from "express";
import { countBooks } from "../../../../lib/book";
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
    }: QueryParams = req.query;

    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    const sortField = sort_by || "updatedAt";
    const sortOrder = sort_type === "asc" ? 1 : -1;
    const searchTerm = search || "";

    const genreCodes = genres?.split(",");

    const genreId = await Genre.find({ code: genreCodes || "" }).select("_id");
    const transformGenreId = genreId.map((id) => {
      return id._id.toString();
    });

    const searchFilter = transformGenreId.length
      ? {
          title: {
            $regex: searchTerm,
            $options: "i",
          },
          genre: transformGenreId,
        }
      : {
          title: {
            $regex: searchTerm,
            $options: "i",
          },
        };

    const books = await Book.find(searchFilter)
      .populate({ path: "author", select: ["name"] })
      .populate({ path: "genre", select: ["title", "code"] })
      .sort([[sortField, sortOrder]])
      .skip(pageNum * limitNum - limitNum)
      .limit(limitNum);

    const bookNum = await countBooks(searchTerm);

    const pagination = paginationGen({
      totalItem: bookNum,
      limit: limitNum,
      currPage: pageNum,
    });

    res.status(200).json({
      code: 200,
      message: "Successfully retive data.",
      data: books,
      pagination,
    });
  } catch (error) {
    console.log(error);
    return next(serverError("An error occurred while retrieving books data."));
  }
};
