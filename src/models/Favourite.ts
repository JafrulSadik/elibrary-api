import mongoose, { Schema } from "mongoose";
import { FavouriteType } from "./../types/Favourite";

const favouriteBooksSchema = new mongoose.Schema<FavouriteType>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

const Favourite = mongoose.model<FavouriteType>(
  "Favourite",
  favouriteBooksSchema
);

export default Favourite;
