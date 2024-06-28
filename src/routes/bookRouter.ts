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
bookRouter.put(
  "/",
  authenticate,
  authorize(["user"]),
  bookOwnership,
  upload.fields(fields),
  bookController.updateBook
);
bookRouter.delete(
  "/:bookId",
  authenticate,
  authorize(["user", "admin"]),
  bookOwnership,
  bookController.deleteBook
);
bookRouter.get("/", bookController.findAllBooks);
bookRouter.get("/:bookId", bookController.getSingleBook);

export default bookRouter;
