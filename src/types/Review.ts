import { BookType } from "./Book";
import { UserType } from "./User";
export type ReveiwType = {
  bookId: BookType;
  authorId: UserType;
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
};
