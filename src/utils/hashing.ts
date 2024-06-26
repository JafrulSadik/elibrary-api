import { compare, hash } from "bcrypt";

type CompareData = {
  password: string;
  hash: string;
};

export const generateHash = async (data: string, saltRounds = 10) => {
  try {
    const hashData = await hash(data, saltRounds);
    return hashData;
  } catch (error) {
    return false;
  }
};

export const compareHash = async ({ password, hash }: CompareData) => {
  return await compare(password, hash);
};
