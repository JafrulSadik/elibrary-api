import { BookType } from "./Book";
import { UserType } from "./User";

type User = Pick<UserType, "_id" | "name">;

export type FavouriteType = {
  user: User;
  books: BookType[];
};
