import { JSX } from "react";
import { LigneProvider } from "./Lignes/LignesProvider";
import { SizeProvider } from "./Size/SizeProvider";

interface IAllContextsProps {
  children?: JSX.Element | JSX.Element[] | string | string[];
}
export function AllContexts({ children }: IAllContextsProps) {
  return (
    <LigneProvider>
      <SizeProvider>{children}</SizeProvider>
    </LigneProvider>
  );
}
