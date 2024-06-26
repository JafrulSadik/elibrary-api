import { config } from "dotenv";

config();

const _config = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  env: process.env.ENV,
  jwtSecret: process.env.JWT_SECRET,
  cloudName: process.env.CLOUD_NAME,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
};

export default Object.freeze(_config);
