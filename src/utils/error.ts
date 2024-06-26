import { ResponseError } from "./../types/Error";

export const notFound = (msg = "Resource not found") => {
  const error = new Error(msg) as ResponseError;
  error.status = 404;
  return error;
};

export const badRequest = (msg = "Bad Request") => {
  const error = new Error(msg) as ResponseError;
  error.status = 400;
  return error;
};

export const serverError = (msg = "Internal Server Error") => {
  const error = new Error(msg) as ResponseError;
  error.status = 500;
  return error;
};

export const authenticationError = (msg = "Authentication Failed") => {
  const error = new Error(msg) as ResponseError;
  error.status = 401;
  return error;
};

export const authorizationError = (msg = "Permission Denied") => {
  const error = new Error(msg) as ResponseError;
  error.status = 403;
  return error;
};
