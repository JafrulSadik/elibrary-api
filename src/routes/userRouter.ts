import express from "express";
import { userController } from "../api/v1/user";
import { authenticate, authorize } from "../middlewares";
import upload from "../middlewares/upload";

const fields = [
  {
    name: "profileImg",
    maxCount: 1,
  },
];

const userRouter = express.Router();

userRouter.get(
  "/:userId",
  authenticate,
  authorize(["admin"]),
  userController.getSingleUser
);

userRouter.patch(
  "/",
  authenticate,
  upload.fields(fields),
  userController.updateUserInfo
);

userRouter.get(
  "/:userId/all-books",
  authenticate,
  authorize(["user", "admin"]),
  userController.getUserBooks
);
userRouter.get("/", userController.getAllUser);

export default userRouter;
