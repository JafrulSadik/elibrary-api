type PaginationParam = {
  totalItem: number;
  limit: number;
  currPage: number;
};

type PaginationResult = {
  page: number;
  prev: number | null;
  next: number | null;
  totalPage: number;
};

export const paginationGen = ({
  totalItem,
  limit,
  currPage,
}: PaginationParam): PaginationResult => {
  const totalPage = Math.ceil(totalItem / limit);
  const prev = currPage > 1 ? currPage - 1 : null;
  const next = totalPage > currPage ? currPage + 1 : null;

  return {
    page: currPage,
    prev,
    next,
    totalPage,
  };
};
