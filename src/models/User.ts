import mongoose from "mongoose";
import { UserType } from "../types";

const userSchema = new mongoose.Schema<UserType>(
  {
    name: {
      type: String,
      length: {
        minlength: 1,
      },
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    profileImg: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    about: {
      type: String,
    },
    status: {
      type: String,
      enum: ["public", "blocked"],
      default: "public",
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserType>("User", userSchema);

export default User;
