import { NextFunction, Request, Response } from "express";
import Favourite from "../../../../models/Favourite";
import { QueryParams } from "../../../../types";
import { paginationGen, serverError } from "../../../../utils";

export const findAllFavouriteBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit }: QueryParams = req.query;
  const { userId } = req.params;

  try {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 5;

    const favBooks = await Favourite.findOne({ user: userId }).populate({
      path: "books",
      options: {
        limit: limitNum,
        skip: pageNum * limitNum - limitNum,
      },
    });

    if (!favBooks) {
      return res.status(200).json({
        code: 200,
        message: "Books retrive successfully.",
        data: [],
      });
    }

    const allBooks = await Favourite.findOne({ user: userId });

    const bookCount = allBooks?.books.length;

    const pagination = paginationGen({
      totalItem: bookCount || 0,
      limit: limitNum,
      currPage: pageNum,
    });

    const response = {
      code: 200,
      message: "Books retrive successfully.",
      data: favBooks.books,
      pagination,
    };
    res.status(200).json(response);
  } catch (error) {
    return next(serverError());
  }
};
