import { useCallback } from "react";
import { IRequestConfig } from "../Interfaces/RequestConfig.itf";
import { useFetch } from "../useFetch";
import { IFetchState } from "../Interfaces/FetchState.itf";

export type TLigneSpeed = {
  v_max: number | null;
  code_ligne: string;
};

export function useFetchLigneSpeed(
  config: Partial<IRequestConfig<TLigneSpeed[]>> = {}
): [
  (
    page?:
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 7
      | 8
      | 9
      | 10
      | 11
      | 12
      | 13
      | 14
      | 15
      | 16
      | 17
      | 18
      | 19
      | 20
      | 21
      | 22
      | 23
      | 24
      | 25
  ) => void,
  IFetchState<TLigneSpeed[]>
] {
  const [runBaseFetch, state] = useFetch<TLigneSpeed[]>({
    ...config,
    onSuccess: (r, t) => {
      if (config.onSuccess) config.onSuccess(r, t);
    },
  });

  const runRequest = useCallback(
    (
      page:
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | 13
        | 14
        | 15
        | 16
        | 17
        | 18
        | 19
        | 20
        | 21
        | 22
        | 23
        | 24
        | 25 = 1
    ) => {
      runBaseFetch(
        "vitesse-maximale-nominale-sur-ligne/records",
        [], // PARAMS
        {
          limit: 100,
          select: "v_max,code_ligne",
          order_by: "code_ligne",
          offset: (page - 1) * 100,
        } // QUERY
      );
    },
    [runBaseFetch]
  );

  return [runRequest, state];
}
