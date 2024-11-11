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

export const MINIMUM_QUOTES_POOL_LENGTH = 5;
