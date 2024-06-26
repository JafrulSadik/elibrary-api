import express, { Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes";

const app = express();

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Everything is ok.",
  });
});

// Use the combined router
app.use(router);

app.use(globalErrorHandler);

export default app;
