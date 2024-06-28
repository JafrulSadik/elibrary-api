import { NextFunction, Request, Response } from "express";
import User from "../../../../models/User";
import { QueryParams } from "../../../../types";
import { serverError } from "../../../../utils";
import { countUser } from "./../../../../lib/user/index";
import { paginationGen } from "./../../../../utils/pagination";

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, sortBy, sortType, search }: QueryParams = req.query;

    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    const sortField = sortBy || "updatedAt";
    const sortOrder = sortType === "dsc" ? -1 : 1;
    const searchTerm = search || "";

    const searchFilter = {
      name: {
        $regex: searchTerm,
        $options: "i",
      },
    };

    const users = await User.find(searchFilter)
      .select(["-__v", "-password"])
      .sort([[sortField, sortOrder]])
      .skip(pageNum * limitNum - limitNum)
      .limit(limitNum);

    const userNum = await countUser(searchTerm);

    const pagination = paginationGen({
      totalItem: userNum,
      limit: limitNum,
      currPage: pageNum,
    });

    res.status(200).json({
      code: 200,
      message: "Successfully retive data.",
      data: users,
      pagination,
    });
  } catch (error) {
    console.log(error);
    return next(serverError("Error occured while retriving users data."));
  }
};
