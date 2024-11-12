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
