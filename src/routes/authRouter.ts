import express from "express";
import { authController } from "../api/v1/auth";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

export default authRouter;
