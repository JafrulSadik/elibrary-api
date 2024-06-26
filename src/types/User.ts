export type Role = "user" | "admin";
export type Status = "public" | "blocked";

export type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
  role?: Role;
  status?: Status;
};
