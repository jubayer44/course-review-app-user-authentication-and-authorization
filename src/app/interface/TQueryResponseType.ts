export type TQueryResponse<T> = {
  modelQuery: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
};
