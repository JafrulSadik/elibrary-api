import mongoose, { Schema } from "mongoose";
import { ReveiwType } from "./../types/Review";

const reviewSchema = new mongoose.Schema<ReveiwType>(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
      default: 5,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ReveiwType>("Review", reviewSchema);
