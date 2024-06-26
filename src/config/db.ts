import mongoose from "mongoose";
import { serverError } from "../utils";
import config from "./config";

const dbConnect = async () => {
  try {
    await mongoose.connect(config.dbUrl as string, {
      dbName: config.dbName,
    });
  } catch (error) {
    throw serverError("DB Connection failed.");
  }
};

export default dbConnect;
