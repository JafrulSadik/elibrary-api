import express, { Request, Response } from "express";
import config from "./config/config";
import dbConnect from "./config/db";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes";

const app = express();

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
app.use(router);

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
