import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      requried: true,
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

export default mongoose.model("Review", reviewSchema);
