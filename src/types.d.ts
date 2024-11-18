import { LOADING_STATUS, MESSAGE_TYPES } from "./fixtures";

export interface Params {
  serverApi: string;
  positionX?: "left" | "right" | "center";
  positionY?: "top" | "bottom" | "center";
  delay?: string;
  autoPlay?: boolean;
  noBorders?: boolean;
  showControlls?: boolean;
}

export type TLOADING_STATUS = keyof typeof LOADING_STATUS;

export type TMESSAGE_TYPES = keyof typeof MESSAGE_TYPES;

export interface Quote {
  text: string;
  author: string;
  type: TMESSAGE_TYPES["quote"];
}

export interface QuoteError {
  text: string;
  type: TMESSAGE_TYPES["error"];
}

export type ApiMessage = Quote | QuoteError;
declare global {
  interface Window {
    INITIAL_STOIC_PARAMS: Params;
  }
}
