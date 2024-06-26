import { unlink } from "fs/promises";
import path from "path";
import { badRequest } from "./error";

export const removeFile = async (file: Express.Multer.File) => {
  const fileName = file.filename;
  const dest = path.resolve(__dirname, "../../public/data/uploads", fileName);

  try {
    await unlink(dest);
  } catch (err) {
    throw badRequest("Error occured while removing file.");
  }
};
