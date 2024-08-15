import mongoose, { Schema } from "mongoose";
import { BookType } from "./../types/Book";

const bookSchema = new mongoose.Schema<BookType>(
  {
    title: {
      type: String,
      length: {
        minlength: 1,
      },
      required: true,
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "blocked", "decline"],
      default: "approved",
    },
    downloads: {
      type: Number,
      default: 0,
    },
    file: {
      type: String,
      required: true,
    },
    prevStart: {
      type: Number,
    },
    prevEnd: {
      type: Number,
    },
    previewFile: {
      type: String,
    },
    price: {
      type: Number,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    numOfRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<BookType>("Book", bookSchema);
