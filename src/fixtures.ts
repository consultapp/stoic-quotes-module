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

const INITIAL_PARAMS_DAFAULT: Params = {
  positionX: "left",
  positionY: "bottom",
  noBorders: false,
  showControlls: true,
  delay: "60",
  serverApi: "https://stoicquotes.ru/random",
};

export const initialParams: Params = {
  ...INITIAL_PARAMS_DAFAULT,
  ...(window as Window).INITIAL_STOIC_PARAMS!,
};
