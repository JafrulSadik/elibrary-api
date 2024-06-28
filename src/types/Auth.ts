import { Request } from "express";

export type AuthRequest = Request & {
  user: {
    id: string;
    role: string;
    email: string;
  };
};
