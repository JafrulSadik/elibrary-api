import { NextFunction, Request, Response } from "express";
import cloudinary from "../../../../config/cloudinary";
import Book from "../../../../models/Book";
import { notFound, serverError } from "../../../../utils";

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById({ _id: bookId });

    if (!book) {
      return next(notFound("Book not found!"));
    }

    // Remove cover image file form coudinary
    const bookCoverImgUrl = book.cover;
    const coverImgSplitUrl = bookCoverImgUrl.split("/");
    //   Generate public id form url
    const coverImgPublicId =
      coverImgSplitUrl.at(-3) +
      "/" +
      coverImgSplitUrl.at(-2) +
      "/" +
      coverImgSplitUrl.at(-1)?.split(".").at(-2);

    try {
      await cloudinary.api.delete_resources([coverImgPublicId]);
    } catch (error) {
      return next(serverError("Removing file form cloudinary faield."));
    }

    // Remove pdf file from cloudinary
    const bookPdfFileUrl = book.file;
    const pdfSplitUrl = bookPdfFileUrl.split("/");
    //   Generate public id form url
    const bookPublicId =
      pdfSplitUrl.at(-3) + "/" + pdfSplitUrl.at(-2) + "/" + pdfSplitUrl.at(-1);

    console.log(bookPublicId);

    try {
      await cloudinary.api.delete_resources([bookPublicId], {
        resource_type: "raw",
      });
    } catch (error) {
      return next(
        serverError(
          "An error occurred while trying to delete the previous file."
        )
      );
    }

    await Book.findByIdAndDelete(bookId);

    res.status(204).json("Book deleted successfully.");
  } catch (error) {
    return next(
      serverError("An error occurred while trying to delete book data.")
    );
  }
};
