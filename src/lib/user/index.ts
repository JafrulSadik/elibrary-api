import User from "../../models/User";

export const userExist = async (email: string) => {
  const user = await User.findOne({ email });
  return user ? true : false;
};
