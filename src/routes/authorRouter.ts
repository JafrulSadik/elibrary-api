import express from "express";
import { authorController } from "../api/v1/author";

const authorRouter = express.Router();

authorRouter.get("/popular", authorController.getPopularAuthors);

export default authorRouter;
