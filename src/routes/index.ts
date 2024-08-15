import { Router } from "express";
import authRouter from "./authRouter";
import bookRouter from "./bookRouter";
import genreRouter from "./genreRouter";
import reviewRouter from "./reviewRouter";
import userRouter from "./userRouter";

const router = Router();

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/books", bookRouter);
router.use("/api/v1/users", userRouter);
router.use("/api/v1/books", reviewRouter);
router.use("/api/v1/genres", genreRouter);

export default router;
