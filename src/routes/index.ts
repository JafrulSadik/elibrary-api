import { Router } from "express";
import authRouter from "./authRouter";
import bookRouter from "./bookRouter";
import reviewRouter from "./reviewRouter";
import userRouter from "./userRouter";

const router = Router();

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/books", bookRouter);
router.use("/api/v1/users", userRouter);
router.use("/api/v1/reviews", reviewRouter);

export default router;
