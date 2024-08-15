import mongoose from "mongoose";
import { serverError } from "../utils";
import { GenreType } from "./../types/Genre";
import Counter from "./Counter";

const genreSchema = new mongoose.Schema<GenreType>({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  code: {
    type: Number,
    default: 0,
    required: true,
  },
});

genreSchema.pre("save", async function (next) {
  const doc = this;

  if (doc.isNew) {
    try {
      // Find the counter for the 'Book' model and increment it
      const counterExist = await Counter.findOne({ modelName: "genre" });

      if (!counterExist) {
        await Counter.findOneAndUpdate(
          { modelName: "genre" },
          { seq: 500 },
          { new: true, upsert: true }
        );
      }

      const counter = await Counter.findOneAndUpdate(
        { modelName: "genre" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      // Assign the incremented sequence number to bookId
      doc.code = counter.seq;
      next();
    } catch (error) {
      next(serverError("Something went wrong."));
    }
  } else {
    next();
  }
});

export default mongoose.model<GenreType>("Genre", genreSchema);
