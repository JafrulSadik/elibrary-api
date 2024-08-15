import express from "express";
import { genreController } from "../api/v1/genre";

const genreRouter = express.Router();

genreRouter.post(
  "/",
  // authenticate, authorize(["admin"])
  genreController.createGenre
);

export default genreRouter;
