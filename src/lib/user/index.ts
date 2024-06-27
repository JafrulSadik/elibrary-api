import User from "../../models/User";

export const userExist = async (email: string) => {
  const user = await User.findOne({ email });
  return user ? true : false;
};

export const countUser = async (search: string = "") => {
  const filter = {
    name: {
      $regex: search,
      $options: "i",
    },
  };

  return User.countDocuments(filter);
};
