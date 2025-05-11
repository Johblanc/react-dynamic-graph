import { useCallback } from "react";
import { IRequestConfig } from "../Interfaces/RequestConfig.itf";
import { useFetch } from "../useFetch";
import { IFetchState } from "../Interfaces/FetchState.itf";

export type TLigneRegion = {
  code_ligne: string;
  region: string;
};

export function useFetchLigneRegion(
  config: Partial<IRequestConfig<TLigneRegion[]>> = {}
): [
  (page?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13) => void,
  IFetchState<TLigneRegion[]>
] {
  const [runBaseFetch, state] = useFetch<TLigneRegion[]>({
    ...config,
    onSuccess: (r, t) => {
      if (config.onSuccess) config.onSuccess(r, t);
    },
  });

  const runRequest = useCallback(
    (page: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 = 1) => {
      runBaseFetch(
        "lignes-par-region-administrative/records",
        [], // PARAMS
        {
          limit: 100,
          select: "code_ligne,region",
          order_by: "code_ligne",
          offset: (page - 1) * 100,
        } // QUERY
      );
    },
    [runBaseFetch]
  );

  return [runRequest, state];
}
