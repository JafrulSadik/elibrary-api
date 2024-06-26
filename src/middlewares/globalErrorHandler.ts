import { NextFunction, Request, Response } from "express";
import config from "../config/config";
import { ResponseError } from "../types";

const globalErrorHandler = (
  err: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    message: err.message,
    code: err.status,
    errorStack: config.env === "development" ? err.stack : "",
  });
};

export default globalErrorHandler;
