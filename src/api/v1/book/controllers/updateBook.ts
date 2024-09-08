import { NextFunction, Request, Response } from "express";
import path from "node:path";
import cloudinary from "../../../../config/cloudinary";
import Book from "../../../../models/Book";
import { notFound, removeFile, serverError } from "../../../../utils";

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, genre, description, bookId } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (!title || !genre || !description || !bookId) {
    if (files["coverImage"]) {
      await removeFile(files["coverImage"][0]);
    }
    if (files["pdfFile"]) {
      await removeFile(files["pdfFile"][0]);
    }
    return next(notFound("Invalid peremeters."));
  }

  try {
    const book = await Book.findById({ _id: bookId });

    if (!book) {
      if (files["coverImage"]) {
        await removeFile(files["coverImage"][0]);
      }
      if (files["pdfFile"]) {
        await removeFile(files["pdfFile"][0]);
      }
      return next(notFound("Book not found!"));
    }

    // Handle image data upload
    let coverImgUploadResult;
    if (files["coverImage"]) {
      const coverImgMimeType = files["coverImage"][0].mimetype
        .split("/")
        .at(-1);
      const coverImgName = files["coverImage"][0].filename;
      const coverImgPath = path.resolve(
        __dirname,
        "../../../../../public/data/uploads",
        files["coverImage"][0].filename
      );

      try {
        coverImgUploadResult = await cloudinary.uploader.upload(coverImgPath, {
          filename_override: coverImgName,
          folder: "/elibrary/book-covers",
          format: coverImgMimeType,
        });
      } catch (error) {
        return next(
          serverError("Error occured while uploading image in cloudinary.")
        );
      }

      const bookCoverImgUrl = book.cover;
      const splitUrl = bookCoverImgUrl.split("/");
      //   Generate public id form url
      const publicId =
        splitUrl.at(-3) +
        "/" +
        splitUrl.at(-2) +
        "/" +
        splitUrl.at(-1)?.split(".").at(-2);

      try {
        await cloudinary.api.delete_resources([publicId]);
        await removeFile(files["coverImage"][0]);
      } catch (error) {
        return next(serverError("Removing file form cloudinary faield."));
      }
    }

    // Handle pdf file upload

    let bookFileUploadResult;
    if (files["pdfFile"]) {
      const bookFileName = files["pdfFile"][0].filename;
      const bookFilePath = path.resolve(
        __dirname,
        "../../../../../public/data/uploads",
        files["pdfFile"][0].filename
      );
      try {
        bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath, {
          filename_override: bookFileName,
          resource_type: "raw",
          folder: "/elibrary/book-files",
          format: "pdf",
        });
      } catch (error) {
        return next(
          serverError(
            "An error occurred while uploading the file to cloudinary."
          )
        );
      }

      const bookPdfFileUrl = book.file;
      const splitUrl = bookPdfFileUrl.split("/");
      //   Generate public id form url
      const publicId =
        splitUrl.at(-3) + "/" + splitUrl.at(-2) + "/" + splitUrl.at(-1);

      try {
        await cloudinary.api.delete_resources([publicId], {
          resource_type: "raw",
        });

        await removeFile(files["pdfFile"][0]);
      } catch (error) {
        return next(
          serverError(
            "An error occurred while trying to delete the previous file."
          )
        );
      }
    }

    const updatedBook = await Book.findByIdAndUpdate(
      { _id: bookId },
      {
        title: title || book.title,
        description: description || book.description,
        genre: genre || book.genre,
        cover: coverImgUploadResult
          ? coverImgUploadResult.secure_url
          : book.cover,
        file: bookFileUploadResult
          ? bookFileUploadResult.secure_url
          : book.file,
      }
    );

    res.status(200).json({
      code: 200,
      message: "Ebook updated successfully.",
      data: updateBook,
    });
  } catch (error) {
    return next(serverError("There was a problem updating the book"));
  }
};
