import { GenreType } from "./Genre";
import { UserType } from "./User";

export type BookType = {
  _id: string;
  title: string;
  genre: GenreType;
  cover: string;
  description: string;
  author: UserType;
  status: "pending" | "approved" | "blocked" | "decline";
  downloads: number;
  file: string;
  prevStart: number;
  prevEnd: number;
  previewFile: string;
  price: number;
  totalRating: number;
  numOfRating: number;
  createdAt: Date;
  updatedAt: Date;
};
