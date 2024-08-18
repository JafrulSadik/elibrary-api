import express from "express";
import { genreController } from "../api/v1/genre";
import { authenticate, authorize } from "../middlewares";

const genreRouter = express.Router();

genreRouter.post(
  "/",
  authenticate,
  authorize(["admin"]),
  genreController.createGenre
);

genreRouter.get("/", genreController.findAllGenre);

genreRouter.get("/:genreId/books", genreController.findAllGenre);

genreRouter.delete(
  "/:genreId",
  authenticate,
  authorize(["admin"]),
  genreController.deleteGenre
);

export default genreRouter;
