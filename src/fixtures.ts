import { Params } from "./types";

export const LOADING_STATUS = {
  idle: "idle",
  pending: "pending",
  loaded: "loaded",
  error: "error",
} as const;

export const MESSAGE_TYPES = {
  error: "error",
  quote: "quote",
  status: "status",
} as const;

export const Theme = {
  dark: "dark",
  light: "light",
  system: "system",
} as const;

export const MINIMUM_QUOTES_POOL_LENGTH = 5;

export const initialParams: Params = {
  positionX: "center",
  positionY: "center",
  baseClassName: "stoic",
  delay: "60",
  serverApi: "https://stoicquotes.ru/random",
};
