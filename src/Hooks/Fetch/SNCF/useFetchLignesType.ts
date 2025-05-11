import { useCallback } from "react";
import { IRequestConfig } from "../Interfaces/RequestConfig.itf";
import { useFetch } from "../useFetch";
import { IFetchState } from "../Interfaces/FetchState.itf";

export type TLigneType = {
  code_ligne: string;
  lib_ligne: string;
  type_ligne: string;
};

export function useFetchLigneType(
  config: Partial<IRequestConfig<TLigneType[]>> = {}
): [
  (page?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11) => void,
  IFetchState<TLigneType[]>
] {
  const [runBaseFetch, state] = useFetch<TLigneType[]>({
    ...config,
    onSuccess: (r, t) => {
      if (config.onSuccess) config.onSuccess(r, t);
    },
  });

  const runRequest = useCallback(
    (page: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 = 1) => {
      runBaseFetch(
        "lignes-par-type/records",
        [], // PARAMS
        {
          limit: 100,
          select: "type_ligne,code_ligne,lib_ligne",
          order_by: "code_ligne",
          offset: (page - 1) * 100,
        } // QUERY
      );
    },
    [runBaseFetch]
  );

  return [runRequest, state];
}
