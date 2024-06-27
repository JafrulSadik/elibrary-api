export type QueryParams = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortType?: string;
  search?: string;
};

export type ReviewQueryParams = Omit<QueryParams, "search">;
