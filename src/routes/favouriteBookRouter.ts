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
  "/:userId",
  authorize(["user", "admin"]),
  favouriteController.findAllFavouriteBooks
);

export default favouriteBookRouter;
