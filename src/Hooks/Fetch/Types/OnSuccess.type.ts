export type TOnSuccess<TData = any> = (
  results?: TData,
  total_count?: number
) => void;
