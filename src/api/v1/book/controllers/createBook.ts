import { NextFunction, Request, Response } from "express";
import path from "node:path";
import cloudinary from "../../../../config/cloudinary";
import Book from "../../../../models/Book";
import Genre from "../../../../models/Genre";
import { AuthRequest } from "../../../../types";
import {
  badRequest,
  notFound,
  removeFile,
  serverError,
} from "../../../../utils";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, genreId, description, author } = req.body;

  const _req = req as AuthRequest;
  const user = _req.user;

  try {
    if (!title || !genreId || !description) {
      return next(badRequest("Invalid parameters."));
    }

    const genre = await Genre.findById(genreId);
    if (!genre) {
      return next(notFound("Genre not found."));
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!files["coverImage"] || !files["pdfFile"]) {
      if (files["coverImage"]) {
        await removeFile(files["coverImage"][0]);
      }
      if (files["pdfFile"]) {
        await removeFile(files["pdfFile"][0]);
      }
      return next(badRequest("Upload valid files."));
    }

    // Handle image data upload
    const coverImgMimeType = files["coverImage"][0].mimetype.split("/").at(-1);
    const coverImgName = files["coverImage"][0].filename;
    const coverImgPath = path.resolve(
      __dirname,
      "../../../../../public/data/uploads",
      files["coverImage"][0].filename
    );
    let coverImgUploadResult;

    try {
      coverImgUploadResult = await cloudinary.uploader.upload(coverImgPath, {
        filename_override: coverImgName,
        folder: "/elibrary/book-covers",
        format: coverImgMimeType,
      });
    } catch (error) {
      return next(serverError("Error while uploading image in cloudinary."));
    }

    // Handle pdf file upload
    const bookFileName = files["pdfFile"][0].filename;
    const bookFilePath = path.resolve(
      __dirname,
      "../../../../../public/data/uploads",
      files["pdfFile"][0].filename
    );

    let bookFileUploadResult;

    try {
      bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath, {
        filename_override: bookFileName,
        resource_type: "raw",
        folder: "/elibrary/book-files",
        format: "pdf",
      });
    } catch (error) {
      return next(serverError("Uploading image in cloudinary faild."));
    }

    const book = new Book({
      title,
      description,
      genre: genreId,
      author: user.id,
      cover: coverImgUploadResult.secure_url,
      file: bookFileUploadResult.secure_url,
    });

    await book.save();

    await removeFile(files["coverImage"][0]);
    await removeFile(files["pdfFile"][0]);

    res.status(201).json({
      code: 201,
      message: "Ebook created successfully.",
      book: book,
    });
  } catch (error) {
    return next(serverError("Error occured while creating a book."));
  }
};
