import http from "node:http";
import app from "./app";
import config from "./config/config";
import dbConnect from "./config/db";

const server = http.createServer(app);
const port = config.port || 5110;

const main = async () => {
  try {
    // DB connection
    await dbConnect();
    console.log("DB connection successfull !!!");

    server.listen(port, () => {
      console.log(`Server is listening on port ${port}.`);
    });
  } catch (error) {
    console.log("Database Error.");
    console.log(error);
  }
};

main();
