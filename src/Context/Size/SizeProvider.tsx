import { SizeContext } from "./SizeContext";
import { JSX } from "react";
import { useWindowSize } from "../../Hooks/Utilities/useWindowSize";

interface ISizeProviderProps {
  children?: JSX.Element | JSX.Element[] | string | string[];
}
export function SizeProvider({ children }: ISizeProviderProps) {
  const { width = 0, height = 0 } = useWindowSize();

  return (
    <SizeContext.Provider
      value={{
        width,
        height,
      }}
    >
      {children}
    </SizeContext.Provider>
  );
}
