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
userRouter.get("/", userController.getAllUser);

export default userRouter;
