import { sign } from "jsonwebtoken";
import config from "../../config/config";
import { badRequest } from "../../utils";

type TokenPayloadType = {
  id: string;
  email: string;
  role: string;
};

export const generateToken = (payload: TokenPayloadType) => {
  try {
    const accessToken = sign(payload, config.jwtSecret as string, {
      expiresIn: "1h",
    });
    return accessToken;
  } catch (error) {
    throw badRequest("Error occured while generating access token");
  }
};
