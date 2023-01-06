import { FC as ReactFC, PropsWithChildren } from "react";

export type FC<P = {}> = ReactFC<PropsWithChildren<P>>;
