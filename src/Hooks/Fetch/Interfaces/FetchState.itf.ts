export interface IFetchState<TData = any> {
  total_count?: number;
  results?: TData;
  status?: "loading" | "success" | "error";
  error: Error | string | null;
  isLoading: boolean;
}
