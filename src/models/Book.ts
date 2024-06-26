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
      type: String,
      length: {
        minlength: 1,
      },
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
    },
    numOfRating: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model<BookType>("Book", bookSchema);
