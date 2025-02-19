import express from "express";
import { authController } from "../../api/v2/auth";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

export default authRouter;
