import express from "express";
import { userController } from "../api/v1/user";
import { authenticate, authorize } from "../middlewares";

const userRouter = express.Router();

userRouter.get(
  "/:userId",
  authenticate,
  authorize(["admin"]),
  userController.getSingleUser
);
userRouter.get(
  "/:userId/all-books",
  authenticate,
  authorize(["user", "admin"]),
  userController.getUserBooks
);
userRouter.get("/", userController.getAllUser);

export default userRouter;
