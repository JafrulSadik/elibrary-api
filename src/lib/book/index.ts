import Book from "../../models/Book";

export const bookExist = async (bookId: string) => {
  const book = await Book.findById(bookId);
  return book ? true : false;
};

export const countBooks = async (search: string = "") => {
  const filter = {
    title: {
      $regex: search,
      $options: "i",
    },
  };

  return Book.countDocuments(filter);
};
