import express from "express";
import { bookController } from "../../api/v2/book";
import { authenticate, authorize, bookOwnership } from "../../middlewares/v2";
import upload from "../../middlewares/v2/upload";

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
bookRouter.get("/latest", bookController.getLatestBooks);
bookRouter.get("/popular", bookController.getPopularBooks);
bookRouter.get("/:bookId", bookController.getSingleBook);

export default bookRouter;
