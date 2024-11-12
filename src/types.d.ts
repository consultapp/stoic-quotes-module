import { LOADING_STATUS, MESSAGE_TYPES } from "./fixtures";

export interface Params {
  root?: HTMLDivElement;
  width?: string;
  positionX?: "left" | "right" | "center";
  positionY?: "top" | "bottom" | "center";
  margin?: string;
  baseClassName?: string;
  delay?: string;
  serverApi: string;
}

export type LOADING_STATUS = keyof typeof LOADING_STATUS;

export type MESSAGE_TYPES = keyof typeof MESSAGE_TYPES;

export interface Quote {
  text: string;
  author: string;
  type: typeof MESSAGE_TYPES.quote;
}

export interface QuoteError {
  text: string;
  type: typeof MESSAGE_TYPES.error;
}

export type ApiMessage = Quote | QuoteError;
