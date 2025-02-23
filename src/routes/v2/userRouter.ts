import express from "express";
import { userController } from "../../api/v2/user";
import { authenticate, authorize } from "../../middlewares/v2";
const userRouter = express.Router();

userRouter.get(
  "/:userId",
  authenticate,
  authorize(["admin"]),
  userController.getSingleUser
);

userRouter.patch("/", authenticate, userController.updateUserInfo);

userRouter.get(
  "/:userId/all-books",
  authenticate,
  authorize(["user", "admin"]),
  userController.getUserBooks
);
userRouter.get("/", userController.getAllUser);

userRouter.get(
  "/profile/:userId",
  authenticate,
  authorize(["user", "admin"]),
  userController.getProfile
);

export default userRouter;
