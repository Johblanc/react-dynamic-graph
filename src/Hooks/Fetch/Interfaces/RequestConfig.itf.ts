import { TOnSuccess } from "../Types/OnSuccess.type";

export interface IRequestConfig<TData = any, TMessage = string | string[]> {
  onSuccess: TOnSuccess<TData>;
  onError: (error?: Error | string, messages?: TMessage) => void;
  onStart: () => void;
  onEnd: () => void;
}
