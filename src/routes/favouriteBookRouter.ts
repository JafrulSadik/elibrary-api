import express from "express";
import { favouriteController } from "../api/v1/favourite";
import { authenticate, authorize } from "../middlewares";

const favouriteBookRouter = express.Router();

favouriteBookRouter.patch(
  "/add",
  authenticate,
  authorize(["user", "admin"]),
  favouriteController.addToFavourite
);

favouriteBookRouter.get(
  "/books/:userId",
  authenticate,
  authorize(["user", "admin"]),
  favouriteController.findAllFavouriteBooks
);

favouriteBookRouter.get(
  "/:userId/:bookId",
  authenticate,
  authorize(["user", "admin"]),
  favouriteController.isAddedToFavourite
);

export default favouriteBookRouter;
