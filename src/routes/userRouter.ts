import express from "express";
import { userController } from "../api/v1/user";

const userRouter = express.Router();

userRouter.get("/:userId", userController.getSingleUser);
userRouter.get("/", userController.getAllUser);

export default userRouter;
