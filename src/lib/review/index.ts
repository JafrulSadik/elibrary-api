import Review from "../../models/Review";

export const countReviews = async (bookId: string) => {
  return Review.countDocuments({ bookId });
};
