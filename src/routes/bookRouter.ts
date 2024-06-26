import express from "express";
import { bookController } from "../api/v1/book";
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

bookRouter.post("/", upload.fields(fields), bookController.createBook);
bookRouter.put("/", upload.fields(fields), bookController.updateBook);
bookRouter.delete("/:bookId", bookController.deleteBook);
bookRouter.get("/", bookController.findAllBooks);

export default bookRouter;
