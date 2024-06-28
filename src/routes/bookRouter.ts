import express from "express";
import { bookController } from "../api/v1/book";
import { authenticate, authorize, bookOwnership } from "../middlewares";
import upload from "../middlewares/upload";

const bookRouter = express.Router();

const fields = [
  {
    name: "coverImage",
    maxCount: 1,
  },
  {
    name: "pdfFile",
    maxCount: 1,
  },
];

bookRouter.post(
  "/",
  authenticate,
  upload.fields(fields),
  bookController.createBook
);
bookRouter.put("/", upload.fields(fields), bookController.updateBook);
bookRouter.delete(
  "/:bookId",
  authenticate,
  authorize(["User"]),
  bookOwnership,
  bookController.deleteBook
);
bookRouter.get(
  "/",
  authenticate,
  authorize(["admin", "user"]),
  bookController.findAllBooks
);

export default bookRouter;
