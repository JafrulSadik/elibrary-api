export type ResponseError = Error & {
  status?: number;
  errorStack: string;
};
