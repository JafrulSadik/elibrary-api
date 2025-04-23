import { Router } from "express";
import authorRouter from "./authorRouter";
import authRouter from "./authRouter";
import bookRouter from "./bookRouter";
import favouriteBookRouter from "./favouriteBookRouter";
import genreRouter from "./genreRouter";
import reviewRouter from "./reviewRouter";
import userRouter from "./userRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/books", bookRouter);
router.use("/users", userRouter);
router.use("/books", reviewRouter);
router.use("/genres", genreRouter);
router.use("/favourite", favouriteBookRouter);
router.use("/authors", authorRouter);

export default router;
