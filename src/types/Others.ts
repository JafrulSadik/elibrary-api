export type QueryParams = {
  page?: string;
  limit?: string;
  sort_by?: string;
  sort_type?: string;
  search?: string;
};

export type ReviewQueryParams = Omit<QueryParams, "search">;
