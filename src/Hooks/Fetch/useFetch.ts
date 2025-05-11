import { useCallback, useRef, useState } from "react";
import { TResponse } from "./Types/Response.type";
import { IRequestConfig } from "./Interfaces/RequestConfig.itf";
import { IFetchState } from "./Interfaces/FetchState.itf";
import { ERequestMethods } from "./Enum/RequestMethods.enum";

export function useFetch<TData = any, TQuery extends Object = Object>(
  config: Partial<IRequestConfig<TData>> = {}
): [
  (url: string, params: (string | number)[], query: TQuery | undefined) => void,
  IFetchState<TData>
] {
  const [state, setState] = useState<IFetchState<TData>>({
    results: undefined,
    status: undefined,
    error: null,
    isLoading: false,
  });

  const configRef = useRef(config);

  const runRequest = useCallback(
    (
      url: string,
      params: (string | number)[] = [],
      query: TQuery | undefined = undefined
    ) => {
      const RealConfig: IRequestConfig<TData> = {
        ...{
          onSuccess: () => {},
          onError: () => {},
          onStart: () => {},
          onEnd: () => {},
        },
        ...configRef.current,
      };
      const { onSuccess, onError, onStart, onEnd } = RealConfig;
      setState((s) => ({ ...s, isLoading: true }));
      onStart();
      let queryStr = "";
      if (query !== undefined) {
        queryStr = `?${Object.keys(query)
          .map((key) => `${key}=${query[key as keyof typeof query]}`)
          .join("&")}`;
      }

      fetch(
        `${process.env.REACT_APP_API_URL}/${url}${params.map(
          (item) => "/" + String(item)
        )}${queryStr}`,
        {
          method: ERequestMethods.GET,
        }
      )
        .then((resp) => {
          return resp.json() as Promise<TResponse<TData>>;
        })
        .then((resp) => {
          const { total_count, results } = resp;
          if (!total_count || !results) {
            setState((prev) => ({
              ...prev,
              ...{
                status: "error",
              },
            }));
            onError("error");
          } else {
            setState((prev) => ({
              ...prev,
              ...{
                results,
                total_count,
                status: "success",
              },
            }));
            onSuccess(results, total_count);
          }
          onEnd();
        })
        .catch((e) => {
          const error = e instanceof Error ? e : new Error(String(e));
          setState((prev) => ({
            ...prev,
            ...{
              status: "error",
              error,
            },
          }));
          onError(error, undefined);
          onEnd();
        });
    },
    []
  );
  return [runRequest, state];
}
