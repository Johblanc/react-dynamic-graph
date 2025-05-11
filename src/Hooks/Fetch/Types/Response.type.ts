export type TResponse<TData = any> = {
  total_count: number;
  results: TData;
};
