import cors from "cors";
import express, { Request, Response } from "express";
import config from "./config/config";
import dbConnect from "./config/db";
import globalErrorHandler from "./middlewares/common/globalErrorHandler";
import v1router from "./routes/v1";
import v2router from "./routes/v2";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Everything is ok.",
  });
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Everything is ok.",
  });
});

// Use the combined router
app.use("/api/v1", v1router);
app.use("/api/v2", v2router);

app.use(globalErrorHandler);
const port = config.port || 5110;

const main = async () => {
  try {
    // DB connection
    await dbConnect();
    console.log("DB connection successfull !!!");

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}.`);
    });
  } catch (error) {
    console.log("Database Error.");
    console.log(error);
  }
};

main();

export default app;
