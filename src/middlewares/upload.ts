import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "node:path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// Set up storage engine
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) => {
    callback(null, path.resolve(__dirname, "../../public/data/uploads")); // Destination folder for uploads
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ) => {
    const originalName = file.originalname
      .replace(/[^a-zA-Z]/g, "")
      .toLowerCase();
    const randomValue = Math.round(Math.random() * 1000000);
    callback(null, `${Date.now()}-${randomValue}-${originalName}`); // Filename format
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.fieldname === "coverImage") {
    // Accept only JPEG and PNG images for coverImage
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else if (file.fieldname === "pdfFile") {
    // Accept only PDFs for pdfFile
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else {
    cb(null, false);
  }
};

// Initialize Multer with storage configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Max file sizeS is 10 mb
  },
  fileFilter,
});

export default upload;
