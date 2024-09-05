export type QueryParams = {
  page?: string;
  limit?: string;
  sort_by?: string;
  sort_type?: string;
  search?: string;
  genres?: string;
  authors?: string;
  ratings?: string;
};

export type ReviewQueryParams = Omit<QueryParams, "search">;
