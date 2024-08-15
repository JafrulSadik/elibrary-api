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

genreRouter.get(
  "/",
  // authenticate, authorize(["admin"])
  genreController.findAllGenre
);

export default genreRouter;
