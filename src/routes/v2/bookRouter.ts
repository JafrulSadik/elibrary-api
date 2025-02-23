import express from "express";
import { bookController } from "../../api/v2/book";
import { authenticate, authorize, bookOwnership } from "../../middlewares/v2";

const bookRouter = express.Router();

bookRouter.post("/", authenticate, bookController.createBook);

bookRouter.put(
  "/",
  authenticate,
  authorize(["user"]),
  bookOwnership,
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
